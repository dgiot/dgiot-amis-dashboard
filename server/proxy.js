const httpProxy = require('http-proxy');
const { proxyConfig } = require('./config');

// noinspection JSUnresolvedFunction 创建代理服务器
const proxy = httpProxy.createProxyServer({
  ignorePath: true,
});

// 代理测错误处理
proxy.on('error', (err, req, res) => {
  // noinspection JSUnresolvedVariable
  const resData = {
    timestamp: Date.now(),
    error: err.message,
    status: 502,
    exception: "Bad Gateway",
    message: "Bad Gateway",
    path: req.path,
  };
  res.writeHead(resData.status, { 'Content-Type': 'application/json;charset=UTF-8' });
  res.end(JSON.stringify(resData));
  console.log("代理异常", err.message);
});

// 获取代理Url地址
function getProxyUrl(originalUrl) {
  const array = originalUrl.split('/');
  const key = array[2];
  let svc = proxyConfig.proxy[key];
  if (!svc) {
    console.log("获取代理Url失败 | originalUrl=", originalUrl, " | array=", array.slice(1), " | key=", key, " | proxy=", proxyConfig.proxy);
    return undefined;
  }
  if (svc.endsWith("/")) {
    svc = svc.substring(0, svc.length - 1);
  }
  let url = originalUrl.replace('/proxy/', '').replace(key, svc);
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `http://${url}`;
  }
  console.log(`代理Url [${originalUrl} -> (${key})${url}]`);
  return url;
}

// 代理请求处理逻辑
function proxyFnc(ctx) {
  const url = getProxyUrl(ctx.originalUrl);
  if (!url) {
    // url没有配置对应代理 404
    const resData = {
      timestamp: Date.now(),
      error: "not found",
      status: 404,
      exception: "not found",
      message: "资源不存在",
      path: ctx.originalUrl,
    };
    // 响应数据
    ctx.response.status = resData.status;
    ctx.response.type = "json";
    ctx.response.body = resData;
    return;
  }
  ctx.respond = false;
  const { req, res } = ctx;
  proxy.web(req, res, { target: url, changeOrigin: true });
}

exports.proxy = proxy;
exports.proxyFnc = proxyFnc;
