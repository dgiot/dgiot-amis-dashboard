import React, { Component } from "react";
import { Card } from 'antd';
import { request } from '@/utils/request';
import { iotapi } from "@/pages/amis/server-api";
// antd 文档 https://ant.design/components/table-cn/
// react 生命周期 https://react.docschina.org/docs/react-component.html
import konva from "konva"
import * as mqtt from 'mqtt'
import {connectMqtt} from "../../utils/mqtt/mqttClient1"
interface DemoPageProps extends ReactPageComponentProps {
}

interface DemoPageState {
  loading: boolean;
  count: number;
  dataSource: any;
  columns: any
}


class DemoPage extends Component<DemoPageProps, DemoPageState> {
  state: DemoPageState = {
    loading: true,
    count: 0,
    dataSource: [],
    columns: [
      {
        title: '设备id',
        dataIndex: 'objectId',
        key: 'objectId'
      },
      {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '设备地址',
        dataIndex: 'devaddr',
        key: 'devaddr'
      },
      {
        title: 'ip地址',
        dataIndex: 'ip',
      },
      {
        title: '设备状态',
        dataIndex: 'status',
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
      },
    ],
  };
  componentDidMount() {
    this.createkonva();
    this.createMqtt()
  }
  protected createMqtt() {
    const { hostname, protocol } = location
    const { NODE_ENV } = process.env
    const mqttConfig = {
      protocol: protocol == "http:" ? "ws" : "wss",
      url: NODE_ENV == 'development' ? 'dev.iotn2n.com' : hostname,
      port: protocol == "http:" ? 8083 : 8084,
    }
    const mqttUrl = `${mqttConfig.protocol}://${mqttConfig.url}:${mqttConfig.port}`
    const options = {
      clean: true, // true: 清除会话, false: 保留会话
      connectTimeout: 4000, // 超时时间
      // 认证信息
      clientId: 'test',	//客户端ID
      username: 'admin', //连接用户名
      password: 'password',//连接密码，有的密码默认为public
      // 心跳时间
      keepalive: 60,
    }
    // 原文链接：https://blog.csdn.net/qq_43549747/article/details/112565261
    // console.log('mqttClient',mqttClient)
    connectMqtt(mqttConfig.url, mqttConfig.port, 'admin', 'password', 'mqttx_aca65439', false)
    // const client =  mqtt.connect(mqttUrl, options)
    // const client = mqttClient.client            // mqtt.connect(mqttUrl, options)

    // 原文链接：https://blog.csdn.net/qq_43549747/article/details/112565261
    // window.mqtt = mqtt
    // window.mqttUrl = mqttUrl
    // console.info("mqtt connect info ", client)
  }
  // componentDidUpdate(prevProps: Readonly<ReactPageProps>, prevState: Readonly<ReactPageState>, snapshot?: any) {
  //   this.getData();
  // }
  // Noe.dcreated的方式创建konva
  protected createkonva() {
    const json = { "attrs": { "width": 1262, "height": 440,"id":"attrs" }, "className": "Stage", "id":"attrs2","children": [{ "attrs": {},"id":"Layer", "className": "Layer", "children": [{ "attrs": { "x": 200, "y": 200, "sides": 6, "radius": 70, "fill": "red", "stroke": "black", "strokeWidth": 4,"id":"sides" }, "className": "RegularPolygon" }] }] }
    konva.Node.create(json, "dgiotKonva")
    window.konva = konva
  }

  protected getData() {
    const params = {
      "limit": 20,
      "skip": 0,
      "order": '-createdAt',
      "include": 'product,name',
      "where": { "product": { "$ne": null }, "name": { "$ne": null, "$exists": true } }
    }
    this.setState({ loading: true })
    request.get(`${iotapi}/iotapi/classes/Device`, { params })
      .then(
        res => {
          this.setState({ loading: false })
          this.setState({ dataSource: res.results })
        }
      ).finally(() =>
        this.setState({ loading: false })
      );
  }
  render() {
    return (
      <Card bordered={false}>
        <div id="dgiotKonva"></div>
      </Card>
    );
  }
}

export default DemoPage;
