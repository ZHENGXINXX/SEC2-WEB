import React from 'react';
import { QRCode, Space } from 'antd';
import css from './index.module.less';

export default function WechatLogin() {
  return (
    <Space className={css.size}>
      <QRCode type="canvas" value="https://ant.design/" size={350}/>
    </Space>
  );
}
