import React from 'react';
// import { Layout } from 'antd';
import css from './index.module.less';
import StudentLogin from './StudentLogin';
import PhoneLogin from './PhoneLogin';
import WechatLogin from './WechatLogin';
import { Layout, Tabs } from 'antd';

export default function Login() {
  const items = [
    {
      label: '学生登录',
      key: 'StudentLogin',
      children: <StudentLogin />
    },
    {
      label: '手机短信登录',
      key: 'PhoneLogin',
      children: <PhoneLogin />
    },
    {
      label: '微信登录',
      key: 'WechatLogin',
      children: <WechatLogin />
    },
  ];

  return (
    <div>
      <Layout className={css.login}>
        <Layout.Content className={css.content}>
          <div className={css.box}>
          <div className={css.title}>账号登录</div>
            <Tabs items={items} centered/>
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
}
