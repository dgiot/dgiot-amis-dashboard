import { ProxyConfigMap } from "webpack-dev-server";
// @ts-ignore
import path from "path";
import { enableCDN } from "./oss.config";

const { NODE_ENV, ANALYZER, COMPRESSION_TYPE } = process.env;
const pkg = require("../package.json");

interface Settings {
  /** 打包版本号 */
  appVersion: string | number;
  /** 项目根目录绝对路径 */
  rootPath: string;
  /** 运行模式 */
  mode: "development" | "production";
  /** dev服务配置 */
  devServer: {
    openPage: string;
    /** 绑定IP */
    host: "127.0.0.1" | "0.0.0.0";
    /** devServer 端口 */
    port: number;
    /** dev时是否需要自动打开浏览器 */
    needOpenApp: boolean;
    /** 后端接口代理配置 */
    proxy?: ProxyConfigMap;
  };
  /** 需要 Analyzer */
  needAnalyzer: boolean;
  COMPRESSION_TYPE: boolean;
  /** HTML页面默认标题 */
  defaultTitle: string;
  /** 自定义全局变量 */
  define: {
    [name: string]: any;
  };
  dateTime: any;
  webpackBanner: string;
  tokenName: string,

}

// webpack全局配置
const settings: Settings = {
  appVersion: new Date().getTime(),
  rootPath: path.resolve(__dirname, `../`),
  mode: NODE_ENV === "development" ? "development" : "production",
  devServer: {
    host: "127.0.0.1",
    port: 8000,
    needOpenApp: false, // 自动打开浏览器
    /** 打开指定页面 */
    openPage: "dgiot-amis-dashboard",
    proxy: {
      "/iotapi/": {
        target: "http://121.5.171.21",
        changeOrigin: true,
        pathRewrite: { "^": "" }
      },
      "/fileload/": {
        target: "http://121.5.171.21:1250",
        changeOrigin: true,
        pathRewrite: { "^/fileload/": "/" }
      },
      "/usemock/": {
        target: "https://datav.usemock.com",
        changeOrigin: true,
        pathRewrite: { "^/usemock/": "/" }
      }
      // '/!/': {
      //     target: 'http://api-dev.msvc.top',
      //     changeOrigin: true,
      //     pathRewrite: { '^': '' }
      // }
    }
  },
  needAnalyzer: true,
  COMPRESSION_TYPE:COMPRESSION_TYPE == "gzip",
  defaultTitle: "dgiot-amis-dashboard",
  define: {
    isProdEnv: NODE_ENV === "production",
    enableCDN: enableCDN
  },
  dateTime: new Date(),
  webpackBanner:
    `build: 杭州数蛙科技有限公司 \n copyright: dgiot \n project : ${pkg.name} \n version : ${pkg.version} \n description : ${pkg.description} \n author: ${pkg.author} \n time:`,
  tokenName: "dgiot-amis-dashboard_token"
};

export { settings };
