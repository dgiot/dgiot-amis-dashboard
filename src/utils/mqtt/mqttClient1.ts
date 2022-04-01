import { MQTT } from './mq'

// mqtt客户端列表
var mqttList: Array<MQTT> = new Array<MQTT>();

/**
   * 实时数据处理函数
   */
 function handleReal(topic: string, payload: Buffer) {
  // console.log(`data: ${topic}=>${payload.toString()}`);
  const topics = topic.split('/');
}

/**
  * 数据包处理函数
  */
  function handlePacked(topic: string, payload: Buffer) {
  // console.log(`rx: ${topic}=>${payload.toString()}`);
}

/**
   * 连接MQTT服务器
   */
  function connectMqtt(host: string, port: number, user: string, pwd: string, id: string, clean: boolean) {
  let it = new MQTT(host, port);
  it.connect({
    userName: user,
    passWord: pwd,
    clientId: id,
    clean: clean,
  });
  console.log(it);
  
  // 订阅主题 /gb212/#
  it.subscribe('/gb212/#', 0);
  // 设置主题 /gb212/data 的消息回调
  // it.set_message_callback('/gb212/data', handleReal.bind(this));
  // 设置主题 /gb212/rx 的消息回调
  // it.set_message_callback('/gb212/rx', handlePacked.bind(this));
  // 将MQTT变量it放到MQTT客户端列表中
  // mqttList.push(it);
}
  export {
    handleReal,
    handlePacked,
    connectMqtt
  }
// 连接MQTT服务器
// connectMqtt('127.0.0.1', 1883, 'test', '123456', 'this_is_test_200507_nodejs_oilfume_2', true);
