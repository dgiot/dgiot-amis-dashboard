import React, { Component } from "react";
import { Card, Descriptions } from 'antd';
import { request } from '@/utils/request';
import { serverHost } from "../amis/server-api";

interface ReactPageProps extends ReactPageComponentProps {
}

interface ReactPageState {
  loading: boolean;
  orderData: any;
  orderId?: any;
}

class ReactPage extends Component<ReactPageProps, ReactPageState> {
  state: ReactPageState = {
    loading: true,
    orderData: {},
  };


  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps: Readonly<ReactPageProps>, prevState: Readonly<ReactPageState>, snapshot?: any) {
    this.getData();
  }

  protected getData() {
    const { location: { query } } = this.props;
    const orderId = query?.orderId;
    if (orderId === this.state.orderId) return;
    this.setState({ loading: true, orderId });
    request.get(`${serverHost}/iotapi/curd-page@getDetail`, { params: { orderId } })
      .then(orderData => this.setState({ orderData }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { orderData, loading } = this.state;
    return (
      <Card bordered={false} loading={loading}>
        <Descriptions title="订单详情" bordered column={2}>
          <Descriptions.Item label="订单ID">{orderData.orderId}</Descriptions.Item>
          <Descriptions.Item label="订单编号">{orderData.orderCode}</Descriptions.Item>
          <Descriptions.Item label="收货人">{orderData.shipName}</Descriptions.Item>
          <Descriptions.Item label="手机号">{orderData.shipMobile}</Descriptions.Item>
          <Descriptions.Item label="地址">{orderData.shipAddr}</Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }
}

export default ReactPage;
