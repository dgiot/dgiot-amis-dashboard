import glob from "glob";
import slash from "slash";
import path from "path";
import fs from "fs";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { settings } from "./config";
import { cdnPublicPath, enableCDN } from "./oss.config";

// 是否是开发模式
const isDevMode = settings.mode === "development";

/**
 * 扫描html(ejs)文件动态增加入口文件
 * @param config      webpack配置
 * @param srcPath     src路径
 * @param distPath    dist路径
 * @param chunks      文件切割chunks列表
 * @param faviconPath favicon图标路径
 */
const scanHtmlEntry = (config: Configuration, srcPath: string, distPath: string, chunks: string[], faviconPath?: string): void => {
  const htmlFiles: string[] = [];
  const jsExtArr: string[] = [".ts", ".tsx", ".js", ".jsx", ".json"];
  glob
    .sync(slash(`${srcPath}/pages/**/*.ejs`), { matchBase: true })
    .forEach(file => htmlFiles.push(file));
  glob
    .sync(slash(`${srcPath}/pages/**/*.html`), { matchBase: true })
    .forEach(file => htmlFiles.push(file));
  htmlFiles.forEach(htmlFile => {
    const fileExtName = path.extname(htmlFile);
    const fileName = htmlFile.substr(0, htmlFile.length - fileExtName.length);
    let jsFileExists = false;
    let useJsFile: string | undefined = undefined;
    jsExtArr.forEach(ext => {
      const jsFile = `${fileName}${ext}`;
      if (!fs.existsSync(jsFile)) {
        return;
      }
      // console.log("jsFile -> ", jsFile);
      if (jsFileExists) {
        console.warn(`${htmlFile} 对应的js/ts/json文件有多个，将使用文件: ${useJsFile}，当前文件将会被忽略: ${jsFile}`);
        return;
      }
      jsFileExists = true;
      useJsFile = jsFile;
    });
    if (!jsFileExists) {
      console.warn(`${htmlFile} 对应的js/ts/json文件不存在`);
      return;
    }
    const entryKey = useJsFile!.substr(slash(srcPath).length + 1);
    console.log("entryKey -> ", entryKey);
    console.log("useJsFile -> ", useJsFile);
    const outFileName = `${slash(distPath)}${fileName.substr(slash(srcPath).length)}.html`;
    console.log("outFileName -> ", outFileName);
    const options: HtmlWebpackPlugin.Options = {
      template: htmlFile,
      filename: outFileName,
      minify: false,
      title: settings.defaultTitle ?? "webpack4.x",
      favicon: faviconPath,
      appVersion: settings.appVersion,
      chunks: ["manifest", ...chunks, entryKey!],
      urlPrefix: enableCDN ? cdnPublicPath : '/dgiot_amis/',
      isDevMode,
    };
    if (settings.mode === "production") {
      options.minify = {
        removeRedundantAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        collapseBooleanAttributes: true
      };
    }
    config.entry![entryKey] = useJsFile;
    config.plugins!.push(new HtmlWebpackPlugin(options));
  });
}

export { scanHtmlEntry };

