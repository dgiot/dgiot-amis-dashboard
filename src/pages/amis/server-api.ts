// const serverHost = "http://10.7.1.74:18081";
// const serverHost = 'http://prod.iotn2n.com';
// const serverHost = '';
const iotapi = 'http://prod.iotn2n.com';
// const serverHost = 'https://prod.iotn2n.com';
// 设置api地址
const serverHost = process.env.NODE_ENV == 'production' ? location.origin : '';
export { serverHost, iotapi };
