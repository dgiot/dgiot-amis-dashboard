import React from 'react';
import { Button, Result } from 'antd';

const InternalServerErrorPage: React.FC = () => (
  <Result
    status={"500"}
    title="500"
    subTitle={<div style={{ fontSize: 14, fontWeight: "bold" }}>抱歉，服务器发生错误。</div>}
    extra={
      <Button type="primary" onClick={() => history.back()}>
        返回上一页
      </Button>
    }
  />
);

export default InternalServerErrorPage;
