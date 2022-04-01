import React from 'react';
import { Button, Result } from 'antd';

const NoFoundPage: React.FC = () => (
  <Result
    status={"404"}
    title="404"
    subTitle={<div style={{ fontSize: 14, fontWeight: "bold" }}>抱歉，您访问的页面不存在。</div>}
    extra={
      <Button type="primary" onClick={() => history.back()}>
        返回上一页
      </Button>
    }
  />
);

export default NoFoundPage;
