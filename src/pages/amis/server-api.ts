// const serverHost = "http://10.7.1.74:18081";
// const serverHost = 'http://dev.iotn2n.com';
// const serverHost = '';
const iotapi = 'http://dev.iotn2n.com';
// const serverHost = 'https://dev.iotn2n.com';
// 设置api地址
const serverHost = process.env.NODE_ENV == 'production' ? location.origin : '';
export { serverHost, iotapi };
