import path from "path";
import fs from "fs";
import glob from "glob";
import fsExtra from "fs-extra";
import { Compiler } from "webpack";

const PLUGIN_NAME = 'CopyDistFilesPlugin';

interface ObjectPattern {
  from: string;
  to?: string;
  globOptions?: object;
  filter?: (resourcePath: string) => boolean;
  transformPath?: (targetPath: string, absolutePath: string) => string | Promise<string>;
}

interface PluginOptions {
  onBefore?: () => void | Promise<void>
  patterns: ObjectPattern[];
  onAfter?: () => void | Promise<void>
  debug?: boolean;
}

class CopyDistFiles {
  protected config: PluginOptions;

  constructor(options: PluginOptions) {
    this.config = Object.assign({}, options);
  }

  public apply(compiler: Compiler): any {
    compiler.hooks.afterEmit.tapPromise(PLUGIN_NAME, this.copyFile);
  }

  protected copyFile = async () => {
    const { onBefore, patterns, onAfter, debug } = this.config;
    // 前置处理
    if (onBefore instanceof Function) {
      await onBefore();
    }
    const cwd = process.cwd();
    if (!patterns) return;
    for (let pattern of patterns) {
      if (debug) console.log(PLUGIN_NAME, " | pattern -> ", pattern);
      const { from, to = "./", globOptions = {}, filter, transformPath } = pattern;
      await glob(from, globOptions, async (err: Error | null, files: string[]) => {
        if (debug) console.log(PLUGIN_NAME, " | files -> ", files);
        if (err) console.error("复制文件失败", err);
        if (!files || files.length <= 0) return;
        for (let file of files) {
          const stat = fs.statSync(file);
          if (stat.isDirectory()) return;
          // 文件名
          const fileName = path.basename(file)
          // 过滤
          if (filter instanceof Function) {
            if (filter(file)) return
          }
          // 文件全路径
          let toPath = path.join(cwd, to, fileName);
          if (transformPath instanceof Function) {
            toPath = await transformPath(toPath, path.join(cwd, file));
          }
          await fsExtra.ensureDir(path.join(toPath, "../"));
          await fsExtra.copyFile(file, path.join(cwd, toPath));
          console.log("复制文件: ", file, " -> ", toPath);
        }
      })
    }
    if (debug) console.log("config -> ", this.config);
    // 后置处理
    if (onAfter instanceof Function) {
      await onAfter();
    }
  }
}

export { CopyDistFiles };
