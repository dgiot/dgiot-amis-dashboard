import fs from "fs";
import glob from "glob";
import slash from "slash";
import path from "path";
import lodash from "lodash";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { settings } from "./config";
import { cdnPublicPath, enableCDN } from "./oss.config";

// 是否是开发模式
const isDevMode = settings.mode === "development";

/**
 * 扫描js(ts)文件动态增加入口文件
 * @param config        webpack配置
 * @param srcPath       src路径
 * @param distPath      dist路径
 * @param chunks        文件切割chunks列表
 * @param faviconPath   favicon图标路径
 * @param base64Images  base64图片内容
 */
const scanJsEntry = (config: Configuration, srcPath: string, distPath: string, chunks: string[], faviconPath?: string, base64Images?: { [name: string]: string }): void => {
  const defaultHtmlFile = slash(`${srcPath}/template.ejs`);
  const jsFiles: { [dir: string]: string } = {};
  const jsExtArr: string[] = [".ts", ".tsx", ".js", ".jsx", ".json"];
  const htmlExtArr: string[] = [".ejs", ".html"];
  jsExtArr.forEach(ext => {
    glob
      .sync(slash(`${srcPath}/pages/**/index${ext}`), {})
      .forEach(file => {
        const dir = slash(path.dirname(file));
        if (jsFiles[dir]) {
          console.warn(`${dir} 目录下已经存在多个index文件，将忽略文件: ${file}`);
          return;
        }
        jsFiles[dir] = slash(file);
      });
  });
  lodash.forEach(jsFiles, (jsFile, dir) => {
    let htmlFile = defaultHtmlFile;
    htmlExtArr.forEach(ext => {
      const htmlFileTmp = slash(`${dir}/index${ext}`);
      if (!fs.existsSync(htmlFileTmp)) {
        return;
      }
      if (htmlFile !== defaultHtmlFile) {
        console.warn(`${dir} 目录下已经存在多个index(.ejs|.html)文件，将忽略文件: ${htmlFileTmp}`);
        return;
      }
      htmlFile = htmlFileTmp;
    });
    // console.log({htmlFile, jsFile});
    const entryKey = jsFile!.substr(slash(srcPath).length + 1);
    const outFileName = slash(`${distPath}/${entryKey.substr(0, entryKey.length - path.extname(entryKey).length)}.html`);
    // console.log("entryKey -> ", entryKey);
    // console.log("htmlFile -> ", htmlFile);
    // console.log("outFileName -> ", outFileName);
    const options: HtmlWebpackPlugin.Options = {
      template: htmlFile,
      filename: outFileName,
      minify: false,
      title: settings.defaultTitle ?? "webpack4.x",
      favicon: faviconPath,
      appVersion: settings.appVersion,
      chunks: ["manifest", ...chunks, entryKey],
      urlPrefix: enableCDN ? cdnPublicPath : '/dgiot_amis/',
      isDevMode,
      ...base64Images,
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
    config.entry![entryKey] = jsFile;
    config.plugins!.push(new HtmlWebpackPlugin(options));
  });
}

export { scanJsEntry };
