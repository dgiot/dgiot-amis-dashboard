import { ossSecretConfig } from './secret.config';
import dayjs from 'dayjs';

const { ENABLE_CDN } = process.env;
// 是否启用CDN
const enableCDN = `${ENABLE_CDN}` === 'true';

/**
 * 静态资源上次阿里OSS配置
 */
const aliOssConf = {
  /** OSS region */
  region: 'oss-cn-hangzhou',
  /** OSS access KeyId */
  accessKeyId: ossSecretConfig.accessKeyId,
  /** OSS access KeySecret */
  accessKeySecret: ossSecretConfig.accessKeySecret,
  /** OSS bucket */
  bucket: 'cdn-static-resources',
  /** OSS上传文件域名 */
  ossUrl: 'https://cdn-static-resources.oss-cn-hangzhou.aliyuncs.com',
  /** CDN访问域名(oss使用域名绑定之后变成CND) */
  cdnUrl: 'http://cdn.static.msvc.top',
  /** app静态资源上传路径 */
  appPath: 'dgiot_amis',
  /** 版本号 */
  appVersion: `v${dayjs().format('YYYY-MM-DD-HH-mm-ss')}`,
  // appVersion: 'v0.0.1',
};

const cdnPublicPath = enableCDN ? `${aliOssConf.cdnUrl}/${aliOssConf.appPath}/${aliOssConf.appVersion}/` : undefined;

export { enableCDN, aliOssConf, cdnPublicPath };
