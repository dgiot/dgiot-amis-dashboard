const path = require('path');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStatic = require('koa-static');
const KoaSend = require('koa-send');
const { bytesFormat, hasValue } = require('./utils');
const { proxy, proxyFnc } = require('./proxy');
const { proxyConfig, frontConfig } = require('./config');

// router配置
const router = new KoaRouter();
// 健康检查
router.get(['/echo', '/ok'], ctx => {
  ctx.body = { status: "ok", timestamp: Date.now() };
});
// api接口代理
router.all("/proxy/(.*)", proxyFnc);
// 其它请求 - 使用默认代理前缀
if (proxyConfig.default) {
  router.all("/(.*)", ctx => {
    ctx.respond = false;
    const { req, res } = ctx;
    const url = `${proxyConfig.default}${ctx.originalUrl}`;
    console.log("当前请求:", ctx.originalUrl, " | 使用默认代理:", proxyConfig.default, " | url=", url);
    proxy.web(req, res, { target: url, changeOrigin: true });
  });
} else {
  router.get('/(.*)', async (ctx) => {
    if (ctx.path === '/') {
      ctx.path = 'index.html';
    }
    await KoaSend(ctx, path.join('/dist', ctx.path));
  });
}

// 新建app
const app = new Koa();
// 错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
  }
});
// 静态文件服务器
console.log("前端资源文件目录: ", path.join(process.cwd(), frontConfig.dist), `(${frontConfig.dist})`);
app.use(KoaStatic(frontConfig.dist, {
  index: hasValue(frontConfig.index) ? frontConfig.index : 'index.html',
  gzip: true,
  maxage: hasValue(frontConfig.maxAge) ? frontConfig.maxAge : 1000 * 60 * 60 * 24 * 30,
  setHeaders: (res, path, stats) => {
    let flag = true;
    const suffixArray = frontConfig.noNeedMaxAgeSuffix.filter(suffix => path.endsWith(suffix));
    if (suffixArray && suffixArray.length > 0) {
      flag = false;
      res.setHeader('Cache-Control', 'max-age=0,must-revalidate');
    }
    console.log(
      "size: ", (stats ? bytesFormat(stats.size * 8) : '-'),
      " \t| ", (flag === true ? "[use maxage]" : "[no maxage]"),
      " \t| 静态文件: ", path
    );
  },
}));
// 应用router
app.use(router.routes());

exports.app = app;
