import os from 'os';
import fs from 'fs';
import path from 'path';
import OSS from 'ali-oss';
import globby from 'globby';
import slash from 'slash';
import { Compiler } from 'webpack';
import 'colors';

interface PluginOptions {
  /**
   * 上传哪些文件，支持类似gulp.src的glob方法，如'./build/**', 可以为glob字符串或者数组<br/>
   * 1.作为插件使用时：可选，默认为output.path下所有的文件<br/>
   * 2.独立使用时：必须，否则不知道从哪里取图片<br/>
   */
  from?: string[];
  /** 上传到oss哪个目录下，默认为oss根目录。可作为路径前缀使用 */
  dist?: string;
  /** 阿里云上传区域 */
  region: string;
  /** 阿里云的授权accessKeyId */
  accessKeyId: string;
  /** 阿里云的授权accessKeySecret */
  accessKeySecret: string;
  /** 上传到哪个bucket */
  bucket: string;
  /** oss超时设置，默认为30秒(30000) */
  timeout?: number;
  /** 是否覆盖oss同名文件。默认true */
  overwrite?: boolean;
  /** 是否显示上传日志，默认为true */
  verbose?: boolean;
  /** 上传完成是否删除原文件，默认false */
  deleteOrigin?: boolean;
  /** 如果某个目录下的文件都上传到cdn了，是否删除此目录。deleteOrigin为true时候生效。默认false */
  deleteEmptyDir?: boolean;
  /** 自定义上传路径的函数。接收参数为当前文件路径。不传，或者所传函数返回false则按默认路径上传。(默认为output.path下文件路径) */
  setOssPath?: (filePath: string) => string | false;
  /** 配置headers的函数。接收参数为当前文件路径。不传，或者所传函数返回false则不设置header */
  setHeaders?: (filePath: string) => { [header: string]: string };
  /** 构建目录名。如：build。独立使用时候需要。如果已传setOssPath可忽略。默认为空 */
  buildRoot?: string;
  /** 测试，仅显示要上传的文件，但是不执行上传操作。默认false */
  test?: boolean;
}

class WebpackAliyunOss {
  protected config: PluginOptions;
  protected configErrStr: string;
  protected client: OSS;
  protected filesUploaded: string[];
  protected filesIgnored: string[];

  constructor(options: PluginOptions) {
    const { region, accessKeyId, accessKeySecret, bucket } = options;
    this.config = Object.assign(
      {
        test: false,
        verbose: true,
        dist: '',
        buildRoot: '.',
        deleteOrigin: false,
        deleteEmptyDir: false,
        timeout: 30 * 1000,
        setOssPath: null,
        setHeaders: null,
        overwrite: true,
      },
      options,
    );
    this.configErrStr = this.checkOptions(options);
    this.client = new OSS({ region, accessKeyId, accessKeySecret, bucket });
    this.filesUploaded = [];
    this.filesIgnored = [];
  }

  public apply(compiler: Compiler): any {
    if (compiler) {
      this.doWithWebpack(compiler);
    } else {
      return this.doWidthOutWebpack();
    }
  }

  protected doWithWebpack(compiler: Compiler): any {
    compiler.hooks.afterEmit.tapPromise('WebpackAliyunOss', async (compilation) => {
      if (this.configErrStr) {
        compilation.errors.push(new Error(this.configErrStr));
        return Promise.resolve();
      }
      const outputPath = path.resolve(slash(compiler.options.output!.path!));
      const { from = outputPath + '/' + '**', verbose } = this.config;
      const files = await globby(from);
      if (files.length) {
        return this.upload(files, true, outputPath);
      } else {
        verbose && console.log('no files to be uploaded');
        return Promise.resolve();
      }
    });
  }

  protected async doWidthOutWebpack() {
    if (this.configErrStr) return Promise.reject(new Error(this.configErrStr));
    const { from, verbose } = this.config;
    const files = await globby(from!);
    if (files.length) return await this.upload(files);
    else {
      verbose && console.log('no files to be uploaded');
      return Promise.resolve('no files to be uploaded');
    }
  }

  protected async upload(files: string[], inWebpack?: boolean, outputPath: string = '') {
    const { dist, buildRoot, setHeaders, deleteOrigin, deleteEmptyDir, setOssPath, timeout, verbose, test, overwrite } = this.config;
    files = files.map((file) => path.resolve(file));
    this.filesUploaded = [];
    this.filesIgnored = [];
    let splitToken = inWebpack ? '/' + outputPath.split('/').slice(-2).join('/') + '/' : '/' + path.resolve(buildRoot!).split('/').slice(-2).join('/') + '/';
    if (os.platform().indexOf('win') !== -1) {
      splitToken = slash(outputPath);
    }
    try {
      for (let filePath of files) {
        let ossFilePath;
        if (os.platform().indexOf('win') !== -1) {
          ossFilePath = slash(path.join(dist!, filePath.split('\\').join('/').split(splitToken)[1]));
        } else {
          ossFilePath = slash(path.join(dist!, (setOssPath && setOssPath(filePath)) || (splitToken && filePath.split(splitToken)[1]) || ''));
        }
        const fileExists = await this.fileExists(ossFilePath);
        if (fileExists && !overwrite) {
          this.filesIgnored.push(filePath);
          continue;
        }
        if (test) {
          console.log(filePath.blue, 'is ready to upload to ' + ossFilePath.green);
          continue;
        }
        const headers = (setHeaders && setHeaders(filePath)) || {};
        let result = await this.client.put(ossFilePath, filePath, {
          timeout,
          headers: !overwrite ? Object.assign(headers, { 'x-oss-forbid-overwrite': true }) : headers,
        });
        result.url = this.normalize(result.url);
        this.filesUploaded.push(filePath);
        verbose && console.log(filePath.blue, '\nupload to ' + ossFilePath + ' success,'.green, 'cdn url =>', result.url.green);
        if (deleteOrigin) {
          fs.unlinkSync(filePath);
          if (deleteEmptyDir && files.every((f) => f.indexOf(path.dirname(filePath)) === -1)) this.deleteEmptyDir(filePath);
        }
      }
    } catch (err) {
      // @ts-ignore
      console.log(`failed to upload to ali oss: ${err.name}-${err.code}: ${err.message}`.red);
    }
    verbose && this.filesIgnored.length && console.log('files ignored'.blue, this.filesIgnored);
  }

  protected fileExists(filepath: string) {
    return this.client
      .get(filepath)
      .then((result) => result.res.status == 200)
      .catch((e) => e.code != 'NoSuchKey');
  }

  protected normalize(url: string) {
    const tmpArr = url.split(/\/{2,}/);
    if (tmpArr.length > 2) {
      const [protocol, ...rest] = tmpArr;
      url = protocol + '//' + rest.join('/');
    }
    return url;
  }

  protected deleteEmptyDir(filePath: string) {
    let dirname = path.dirname(filePath);
    if (fs.existsSync(dirname) && fs.statSync(dirname).isDirectory()) {
      fs.readdir(dirname, (err, files) => {
        if (err) {
          console.error(err);
        } else {
          if (!files.length) {
            fs.rmdir(dirname, (err) => {
              if (err) {
                console.error(err);
              } else {
                this.config.verbose && console.log('empty directory deleted'.green, dirname);
              }
            });
          }
        }
      });
    }
  }

  checkOptions(options: Partial<PluginOptions> = {}) {
    const { from, region, accessKeyId, accessKeySecret, bucket } = options;
    let errStr = '';
    if (!region) errStr += '\nregion not specified';
    if (!accessKeyId) errStr += '\naccessKeyId not specified';
    if (!accessKeySecret) errStr += '\naccessKeySecret not specified';
    if (!bucket) errStr += '\nbucket not specified';
    if (Array.isArray(from)) {
      // noinspection SuspiciousTypeOfGuard
      if (from.some((g) => typeof g !== 'string')) errStr += '\neach item in from should be a glob string';
    } else {
      let fromType = typeof from;
      if (['undefined', 'string'].indexOf(fromType) === -1) errStr += '\nfrom should be string or array';
    }
    return errStr;
  }
}

export { WebpackAliyunOss };
