// @ts-nocheck
import path from "path";
import fs from "fs";
import fsExtra from "fs-extra";
import chalk from "chalk";
import slash from "slash";
import ip from "ip";
import clipboardy from "clipboardy";
import lodash from "lodash";
import { Configuration, DefinePlugin, HashedModuleIdsPlugin, HotModuleReplacementPlugin, Options,BannerPlugin } from "webpack";
import WebpackMerge from "webpack-merge";
import WebpackBar from "webpackbar";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { settings } from "./config";
import { scanJsEntry } from "./webpack.scan-js-entry";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { WebpackAliyunOss } from "./plugins/webpack-aliyun-oss";
import { CopyDistFiles } from "./plugins/copy-dist-files";
import { aliOssConf, cdnPublicPath, enableCDN } from "./oss.config";

// 是否是开发模式
const isDevMode = settings.mode === 'development';
// src文件夹绝对路径
const srcPath = path.resolve(settings.rootPath, './src');
// pages文件夹绝对路径
// const pagesPath = path.resolve(rootPath, `${pathPrefix}/src/pages`);
// public文件夹绝对路径
const publicPath = path.resolve(settings.rootPath, './dgiot-amis-dashboard/public');
// node_modules文件夹绝对路径
const nodeModulesPath = path.resolve(settings.rootPath, './node_modules');
// 打包输出目录绝对路径
const distPath = path.resolve(settings.rootPath, './dist');
// 网站图标绝对路径
const faviconPath = path.resolve(settings.rootPath, './dgiot-amis-dashboard/public/images/favicon.png');
// 访问地址复制到剪切板(只干一次)
let copyToClipboard = false;

let config: Configuration = {
    entry: {
        schemaApp: `${srcPath}/index`
    },
    module: {
        // noParse: content => {},
        rules: [
            { test: /\.json$/, use: 'json-loader', type: 'javascript/auto' },
            // 图片
            {
                test: /\.(png|jp?g|gif|ico)$/,
                use: [{ loader: 'url-loader', options: { limit: 8192, name: 'images/[name].[hash:8].[ext]', publicPath: '' } }]
            },
            // 字体图标
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                use: [{ loader: 'file-loader', options: { limit: 8192, name: 'fonts/[name].[ext]?[hash:8]', publicPath: '' } }]
            },
            // 音频
            {
                test: /\.(wav|mp3|ogg)?$/,
                use: [{ loader: 'file-loader', options: { limit: 8192, name: 'audios/[name].[ext]?[hash:8]', publicPath: '' } }]
            },
            // 视频
            {
                test: /\.(ogg|mpeg4|webm)?$/,
                use: [{ loader: 'file-loader', options: { limit: 8192, name: 'videos/[name].[ext]?[hash:8]', publicPath: '' } }]
            },
            // js、jsx
            {
                test: /\.jsx?$/,
                use: [
                    { loader: 'cache-loader' },
                    { loader: 'thread-loader', options: { workers: 3 } },
                    { loader: 'babel-loader', options: { cacheDirectory: true } }
                ],
                include: [srcPath],
                exclude: /node_modules/
            },
            // ts、tsx
            {
                test: /\.tsx?$/,
                use: [
                    { loader: 'cache-loader' },
                    { loader: 'thread-loader', options: { workers: 3 } },
                    // {loader: "ts-loader", options: {happyPackMode: true, transpileOnly: true}},
                    { loader: 'babel-loader', options: { cacheDirectory: true } }
                ],
                include: [srcPath],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new DefinePlugin({ ...settings.define }),
        new CopyWebpackPlugin({
            patterns: [
                { from: publicPath, to: './public' },
                ...[
                    // react 相关
                    '/react/umd/react.profiling.min.js',
                    isDevMode ? '/react/umd/react.development.js' : '/react/umd/react.production.min.js',
                    '/react-dom/umd/react-dom.profiling.min.js',
                    isDevMode ? '/react-dom/umd/react-dom.development.js' : '/react-dom/umd/react-dom.production.min.js',
                    // moment 相关
                    isDevMode ? '/moment/min/moment-with-locales.js' : '/moment/min/moment-with-locales.min.js',
                    // @ant-design/icons 相关
                    isDevMode ? '/@ant-design/icons/dist/index.umd.js' : '/@ant-design/icons/dist/index.umd.min.js',
                    // antd 相关
                    isDevMode ? '/antd/dist/antd.js' : '/antd/dist/antd.min.js',
                    isDevMode ? '/antd/dist/antd-with-locales.js' : '/antd/dist/antd-with-locales.min.js',
                    isDevMode ? '/antd/dist/antd.css' : '/antd/dist/antd.min.css',
                    isDevMode ? '/antd/dist/antd.compact.css' : '/antd/dist/antd.compact.min.css',
                    isDevMode ? '/antd/dist/antd.dark.css' : '/antd/dist/antd.dark.min.css',
                    // Dgiot Amis相关
                    '/amis/sdk/**/*.css',
                    '/amis/sdk/**/*.js',
                    '/amis/sdk/**/*.svg',
                    '/amis/sdk/**/*.eot',
                    '/amis/sdk/**/*.svg',
                    '/amis/sdk/**/*.ttf',
                    '/amis/sdk/**/*.woff',
                    '/amis/sdk/**/*.woff2',
                    '/amis/sdk/**/*.eot',
                    '/amis/sdk/**/*.svg',
                    '/amis/sdk/**/*.ttf',
                    '/amis/sdk/**/*.woff',
                    '/amis/sdk/**/*.woff2',
                    '/font-awesome/css',
                    '/font-awesome/fonts',
                ].map((pathItem) => {
                    return {
                        from: `${slash(nodeModulesPath)}${pathItem}`,
                        transformPath: (targetPath: string, absolutePath: string) => {
                            return `./public${slash(absolutePath).substr(slash(nodeModulesPath).length)}`;
                        }
                    };
                })
            ],
            options: { concurrency: 64 }
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        modules: [srcPath, nodeModulesPath],
        alias: { '@': srcPath }
    },
    externals: {
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
        moment: 'moment',
        antd: 'antd',
        // "@ant-design/icons": "AntDesignIcons", // 不起作用
        amis: { commonjs: 'amisRequire', amd: 'amisRequire', root: 'amisRequire' }
        // amis: "amisRequire",
    },
    optimization: {
        noEmitOnErrors: true
    }
};

// postcss-loader 配置
const postcssOptions = {
    plugins: [
        ['postcss-preset-env', {}],
        ['postcss-aspect-ratio-mini', {}],
        ['postcss-write-svg', { utf8: false }]
        // ["postcss-px-to-viewport", {
        //   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
        //   viewportWidth: 750,
        //   // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
        //   viewportHeight: 1334,
        //   // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
        //   unitPrecision: 3,
        //   // 指定需要转换成的视窗单位，建议使用vw
        //   viewportUnit: "vw",
        //   // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        //   selectorBlackList: [".ignore", ".hairlines"],
        //   // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        //   minPixelValue: 1,
        //   // 允许在媒体查询中转换`px`
        //   mediaQuery: false
        // }],
    ]
};

// 开发模式
if (isDevMode) {
    // @ts-ignore
    const devConfig: Configuration = {
        output: {
            path: distPath,
            filename: '[name].bundle.js',
            chunkFilename: '[name].chunk.js',
            publicPath: '/dgiot-amis-dashboard/'
        },
        mode: 'development',
        devtool: 'eval-source-map',
        module: {
            rules: [
                // css
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'cache-loader' },
                        { loader: 'style-loader' },
                        { loader: 'css-loader', options: {} },
                        { loader: 'postcss-loader', options: { postcssOptions: postcssOptions } }
                    ]
                },
                // 编译less
                {
                    test: /\.less$/,
                    use: [
                        { loader: 'cache-loader' },
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: { compileType: 'module', localIdentName: '[path][name]_[local]', localIdentContext: srcPath }
                            }
                        },
                        { loader: 'postcss-loader', options: { postcssOptions: postcssOptions } },
                        { loader: 'less-loader', options: { sourceMap: true } }
                    ]
                }
            ]
        },
        devServer: {
            host: settings.devServer.host,
            port: settings.devServer.port,
            contentBase: `${settings.rootPath}`,
            publicPath: '/dgiot-amis-dashboard/',
            historyApiFallback: true,
            overlay: true,
            hot: true,
            inline: true,
            noInfo: true,
            // 跳过域名检查
            disableHostCheck: false,
            // 服务端代理配置
            proxy: settings.devServer.proxy,
            open: settings.devServer.needOpenApp && 'chrome',
            openPage: settings.devServer.openPage
        },
        plugins: [
            new WebpackBar({
                reporter: {
                    allDone: (context) => {
                        if (copyToClipboard) {
                            return;
                        }
                        copyToClipboard = true;
                        clipboardy.writeSync(`http://127.0.0.1:${settings.devServer.port}/${settings.devServer.openPage}`);
                        const messages = [
                            '  App running at:',
                            `  - Local:   ${chalk.cyan(
                                `http://127.0.0.1:${settings.devServer.port}/${settings.devServer.openPage}`
                            )} (copied to clipboard)`,
                            `  - Network: ${chalk.cyan(
                                `http://${ip.address('public', 'ipv4')}:${settings.devServer.port}/${settings.devServer.openPage}`
                            )}`
                        ];
                        console.log(messages.join('\n'));
                    }
                }
            }),
          new BannerPlugin({
            banner:`${settings.webpackBanner}${settings.dateTime}`
          }),
            new HotModuleReplacementPlugin()
        ]
    };
    // @ts-ignore
    config = WebpackMerge(config, devConfig);
}

// 生产模式
if (!isDevMode) {
  const prodConfig: Configuration = {
        output: {
            path: distPath,
            filename: '[name].[chunkhash].bundle.js',
            chunkFilename: '[name].[chunkhash].chunk.js',
            publicPath: enableCDN ? cdnPublicPath : '/dgiot-amis-dashboard/'
        },
        mode: 'production',
        module: {
            rules: [
                // css
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: {} },
                        { loader: 'postcss-loader', options: { postcssOptions: postcssOptions } }
                    ]
                },
                // 编译less
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    compileType: 'module',
                                    localIdentName: '[path][name]_[local]_[hash:base64:5]',
                                    localIdentContext: srcPath
                                }
                            }
                        },
                        { loader: 'postcss-loader', options: { postcssOptions: postcssOptions } },
                        { loader: 'less-loader', options: { sourceMap: false } }
                    ]
                }
            ]
        },
        plugins: [
            new HashedModuleIdsPlugin(),
            // @ts-ignore
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[name].[hash].css'
            }),
          // @ts-ignore
            new BannerPlugin({
              banner:`${settings.webpackBanner}${settings.dateTime}`
            }),
            new CleanWebpackPlugin({})
        ],
        optimization: {
            moduleIds: 'hashed',
            runtimeChunk: {
                name: 'manifest'
            },
            minimizer: [new TerserPlugin({ parallel: true, extractComments: false }), new OptimizeCSSAssetsPlugin({})],
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        minSize: 1024 * 1024,
                        priority: 0
                    },
                    schema: {
                        test: /[\\/]src[\\/]pages[\\/].*\.(schema|react)\.(ts|tsx|js|jsx|json)$/,
                        chunks: 'async',
                        minSize: 1024 * 256,
                        maxSize: 1024 * 1024,
                        // enforce: true,
                        priority: 1
                    },
                    // 提取 node_modules 中代码
                    vendor: {
                        name: 'vendor',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        priority: 10
                    },
                    amis: {
                        name: 'amis',
                        test: /[\\/]node_modules[\\/]amis[\\/]/,
                        chunks: 'all',
                        priority: 20
                    },
                    // monaco-editor
                    monacoEditor: {
                        name: 'monacoEditor',
                        test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
                        chunks: 'all',
                        priority: 30
                    },
                    // tinymce
                    tinymce: {
                        name: 'tinymce',
                        test: /[\\/]node_modules[\\/]tinymce[\\/]/,
                        chunks: 'all',
                        priority: 40
                    },
                    // echarts
                    echarts: {
                        name: 'echarts',
                        test: /[\\/]node_modules[\\/]echarts[\\/]/,
                        chunks: 'all',
                        priority: 50
                    },
                    // froalaEditor
                    froalaEditor: {
                        name: 'froalaEditor',
                        test: /[\\/]node_modules[\\/]froala-editor[\\/]/,
                        chunks: 'all',
                        priority: 60
                    },
                    // flvJs
                    flvJs: {
                        name: 'flvJs',
                        test: /[\\/]node_modules[\\/]flv.js[\\/]/,
                        chunks: 'all',
                        priority: 70
                    },
                    // hlsJs
                    hlsJs: {
                        name: 'hlsJs',
                        test: /[\\/]node_modules[\\/]hls.js[\\/]/,
                        chunks: 'all',
                        priority: 80
                    }
                }
            }
        }
    };
    // @ts-ignore
    config = WebpackMerge(config, prodConfig);
}

// 动态扫描入口文件 entry HtmlWebpackPlugin
const imageHomeBackground = `data:image/png;base64,${fs.readFileSync(path.join(publicPath, './images/home-background.png'), {
    encoding: 'base64'
})}`;
const imageAmisLogo = `data:image/png;base64,${fs.readFileSync(path.join(publicPath, './images/logo.png'), { encoding: 'base64' })}`;
const imageLogo = `data:image/png;base64,${fs.readFileSync(path.join(publicPath, './images/logo.png'), { encoding: 'base64' })}`;
const base64Images = { imageHomeBackground, imageAmisLogo, imageLogo };
const chunks: string[] = [];
if (config.optimization?.splitChunks && config.optimization?.splitChunks?.cacheGroups) {
    const cacheGroups = (config.optimization!.splitChunks as Options.SplitChunksOptions).cacheGroups as {
        [key: string]: Options.CacheGroupsOptions;
    };
    lodash.forEach(cacheGroups, (option) => {
        chunks.push(option.name as string);
    });
    // console.log("chunks -> ", JSON.stringify(chunks));
}
scanJsEntry(config, srcPath, distPath, chunks, faviconPath, base64Images);

// schema-app 支持
const options: HtmlWebpackPlugin.Options = {
    template: `${srcPath}/template.ejs`,
    filename: `${distPath}/index.html`,
    minify: false,
    title: settings.defaultTitle ?? 'webpack4.x',
    favicon: faviconPath,
    appVersion: settings.appVersion,
    chunks: ['manifest', ...chunks, 'schemaApp'],
    urlPrefix: enableCDN ? cdnPublicPath : '/dgiot-amis-dashboard/',
    isDevMode,
    ...base64Images
};
if (settings.mode === 'production') {
    options.minify = {
        removeRedundantAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        collapseBooleanAttributes: true
    };
}
config.plugins!.push(new HtmlWebpackPlugin(options));

// 生成代码分析报告
if (settings.needAnalyzer) {
    config.plugins!.push(
        new BundleAnalyzerPlugin({
            analyzerPort: 9528,
            analyzerMode: 'static',
            openAnalyzer: true,
            reportFilename: `${settings.rootPath}/out/report.html`
        })
    );
}

// CDN支持(静态资源上传到阿里OSS)
if (enableCDN) {
    const webpackAliyunOss = new WebpackAliyunOss({
        // test: true,
        timeout: 1000 * 60 * 10,
        from: ['./dist/**', '!./dist/*.html', '!./dist/**/*.map', '!./dist/pages/**/*.html'],
        dist: `${aliOssConf.appPath}/${aliOssConf.appVersion}/`,
        region: aliOssConf.region,
        accessKeyId: aliOssConf.accessKeyId,
        accessKeySecret: aliOssConf.accessKeySecret,
        bucket: aliOssConf.bucket,
        // setOssPath(filePath: string) {
        //   return filePath;
        // },
        setHeaders(filePath: string) {
            return {
                // 缓存时间
                'Cache-Control': 'max-age=31536000'
            };
        }
    });
    config.plugins!.push(webpackAliyunOss);
    config.plugins!.push(
        new CopyDistFiles({
            onBefore: () => fsExtra.rmdirSync('./server/dist', { recursive: true }),
            patterns: [
                {
                    from: './dist/**/*.html',
                    transformPath: (targetPath, absolutePath) => {
                        return `./server/dist/${slash(absolutePath).substr(slash(distPath).length)}`;
                    }
                }
            ]
        })
    );
}

export default config;
