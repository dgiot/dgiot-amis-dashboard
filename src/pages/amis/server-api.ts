// const serverHost = "http://10.7.1.74:18081";
// const serverHost = 'http://121.5.171.21';
// const serverHost = '';
const iotapi = 'http://121.5.171.21';
// const serverHost = 'http://121.5.171.21';
// 设置api地址
const serverHost = process.env.NODE_ENV == 'production' ? location.origin : '';
export { serverHost, iotapi };
