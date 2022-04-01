import * as mqtt from "mqtt"
const { hostname, protocol } = location
const { NODE_ENV } = process.env
const mqttClient = {
  client:{},
  mqttConfig :{
    protocol: protocol == "http:" ? "ws" : "wss",
    url: NODE_ENV == 'development' ? 'dev.iotn2n.com' : hostname,
    port: protocol == "http:" ? "8083" : "8084",
  },
  mqttUrl:`${mqttConfig.protocol}://${mqttConfig.url}:${mqttConfig.port}`,
  options :{
    // clean: false, // true: 清除会话, false: 保留会话
    // connectTimeout: 4000, // 超时时间
    // // 认证信息
    // clientId: 'test',	//客户端ID
    // username: 'admin', //连接用户名
    // password: 'password',//连接密码，有的密码默认为public
    // // 心跳时间
    // keepalive: 60,
  },
  // client:mqtt.connect(mqttUrl, options),
  initMqtt (opions) {
    this.options = Object.assign({
     clean: true, // true: 清除会话, false: 保留会话
    connectTimeout: 4000, // 超时时间
    // 认证信息
    clientId: 'test',	//客户端ID
    username: 'admin', //连接用户名
    password: 'password',//连接密码，有的密码默认为public
    // 心跳时间
    keepalive: 60,
    }, opions)
    this.client = mqtt.connect(this.mqttUrl, this.options)
    this.client.on('connect', (e) => {
      // if (Reflect.has(Dialog, 'close'))Dialog.close()
      console.log(`连接成功`)
      // if (!store.state.mqttOnline) store.commit('CHANGEMQTTSTATE', !0)
    })
    this.client.on('error', (e) => {
      console.log('error', e)
    })
    this.client.on('offline', (e) => {
      // if (store.state.mqttOnline) store.commit('CHANGEMQTTSTATE', !1)
      // Dialog.alert({
      //   title: '提示',
      //   message: 'mqtt服务已掉线，请检测网络后等待重连或者刷新后重试',
      //   showCancelButton: !0
      // })
      // console.log('offline', e)
    })
    this.client.on('disconnect', (e) => {
      // console.log('disconnect', e)
    })
    this.client.on('close', (e) => {
      // console.log('close', e)
    })
    this.client.on('message', (topic, payload) => {
      console.log('%c收到message，解密前原始数据', 'color:#0088f5', payload)
      // if (Reflect.has(loading, 'clear')) {
      //   loading.clear()
      //   clearInterval(timer1)
      // }
      // if (Reflect.has(Dialog, 'close'))Dialog.close()
      // clearTimeout(timer)
      // let data = common.decryptedData(payload)
      // // console.log('%c解密完成数据：', 'color:#0088f5;', data)
      // if (data.index === window.$index) {
      //   window.$index++
      //   vm.onMqttMessage(topic, data)
      // } else {
      //   // to do something
      //   // console.log('index对应', window.$index + '!==' + data.index)
      // }
    })
  },
  checkState (success = function () { }) {
    this.client.on('connect', (e) => {
      // console.log(`${this.pramas.clientId}连接成功`)
      success(e)
    })
  },
  /**
    * 自定义mqtt publish (9)
    * @param {Object} data 总数据
    * @param {Object} data._this vue实例
    * @param {String} data.topic topic
    * @param {Array} data.encryptedData 加密数据
    * @param {Object} data.message 展示信息
    * @param {Object} data.showInterval 展示定义器
    * @param {Object} data.showFailTip 展示错误提示
    * @param {Object} data.DialogOptions Dialog参数
    * @param {Object} data.options mqtt publish options
    * @param {Object} data.timeOut 超时时间
    */
   publish (data) {
    return new Promise((resolve, reject) => {
      data = Object.assign({
        _this: data._this,
        topic: '',
        encryptedData: [],
        message: '连接中',
        showInterval: !0,
        showFailTip: !0,
        DialogOptions: {
          title: '提示',
          message: '与设备连接超时',
          confirmButtonText: '确认'
        },
        options: {},
        timeOut: 10
      }, data)
      if (data._this === null) console.error('[data._this] can not be null, you should check if send vue[this]?')
      if (data.topic === '') console.error('[publish.topic] can not be undefined')
      // vm = data._this
      if (data.showInterval) {
        loading = common.showIntervalLoading({
          message: `${data.message}10秒`
        })
        let second = data.timeOut
        clearInterval(timer1)
        timer1 = setInterval(() => {
          second--
          if (second) {
            loading.message = `${data.message}${second}秒`
          } else {
            clearInterval(timer1)
            loading.clear()
            if (data.showFailTip) {
              loading.clear()
              Dialog.alert(data.DialogOptions)
            }
            resolve(data.topic)
          }
        }, 1000)
      }
      // console.log('发送数据:', new Uint8Array(data.encryptedData))
      // this.clinet.publish(data.topic, new Uint8Array(data.encryptedData), Object.assign({ qos: 0 }, data.options), (err) => {
      //   if (err) {
      //     // console.log(err)
      //     loading.clear()
      //     clearInterval(timer1)
      //     Dialog.alert({
      //       title: '提示',
      //       message: '发送信息失败'
      //     })
      //   } else {
      //     console.log('%c数据发送成功', 'color:#ea3800')
      //   }
      // })
    })
  },
  end () {
    this.client.end()
  },
  destroy () {
    clearInterval(timer1)
    // loading.clear()
    // Dialog.close()
  },
  subscribe (topic, options, callback = function () { }) {
    this.ws.subscribe(topic, Object.assign({ qos: 0 }, options), (err) => {
      if (err) {
        console.log(
          "订阅失败"
        );
        // Dialog.alert({
        //   title: '提示',
        //   message: '订阅失败'
        // })
      }
      callback(err)
    })
  },
  unsubscribe (topic, options, callback = function () { }) {
    this.client.unsubscribe(topic, Object.assign({ qos: 0 }, options), (err) => {
      if (!err) {
        callback()
      }
    })
  },
  /**
   * 自定义mqtt sendMessage (11)
   * @param {Object} t 总数据
   * @param {Object} t._this vue实例
   * @param {Array} t.data 加密前数据
   * @param {String} t.equiImei 设备Imei
   * @param {Boolean} t.showInterval 展示定时器
   * @param {Boolean} t.showFailTip 展示错误提示
   * @param {String} t.message 信息提示
   * @param {Object} t.subscribePrefix sub前缀
   * @param {Object} t.publishPrefix pub前缀
   * @param {Object} t.DialogOptions Dialog参数
   * @param {Object} t.options mqtt publish options
   * @param {Object} t.timeOut 超时时间
   */
  sendMessage (t) {
    return new Promise((resolve, reject) => {
      t = Object.assign({
        _this: null,
        data: [],
        equiImei: '',
        showInterval: !0,
        showFailTip: !0,
        message: '同步中',
        subscribePrefix: '2/5',
        publishPrefix: '2/3',
        DialogOptions: {
          title: '提示',
          message: '与设备连接超时',
          confirmButtonText: '确认'
        },
        options: {},
        timeOut: 10
      }, t)
      this.subscribe(`${t.subscribePrefix}/${t.equiImei}`, {}, (err) => {
        if (!err) {
          getEquiKey({
            equiImei: t.equiImei
          })
            .then(res => {
              if (res.code === 0) {
                this.publish({
                  _this: t._this,
                  topic: `${t.publishPrefix}/${t.equiImei}`,
                  encryptedData: common.getEncryptedData(t.cmdType, [...t.data], res.data),
                  options: t.options,
                  showInterval: t.showInterval,
                  message: t.message,
                  showFailTip: t.showFailTip,
                  DialogOptions: t.DialogOptions,
                  timeOut: t.timeOut
                })
                  .then(res => {
                    console.log('数据获取失败')
                    resolve(res)
                  })
              }
            })
        }
      })
    })
  }
  // this.client = mqtt('mqtt://47.105.162.0', this.pramas)
}
export default mqttClient
