import React, { useEffect, useState } from 'react';
import css from './index.module.less';
import Account from './Account';
import Message from './Message';
import { Card, Tabs, message } from 'antd';
import './index.less';
import { detail } from './api';
import State from '@/tools/state';

export default function index() {

  const [messages, setMessages] = useState({});
  const id = State.userInfo.id;

  const getMessage = async (id) => {
    const [error, resData] = await detail(id);
    if (error) {
      message.error(error.messages);
      return;
    }

    if (resData.code === 200) {
      setMessages(resData.data);
    } else {
      message.error(resData.message);
    }
  };

  useEffect(() => {
    if (id > 0)
      getMessage(id);
  }, [id]);

  const items = [
    {
      key: 'account',
      label: <span>账户信息</span>,
      children: <Account messages={messages} update={getMessage} />
    },
    {
      key: 'message',
      label: <span>通知设置</span>,
      children: <Message messages={messages} />
    }
  ];


  return (
    <div className={css.content}>
      <Card
        className={css.card}>
        <div className={css.display}>
          <img src='https://assets.ketangpai.com//Public/Common/img/40/33.png' />
          <div className={css.right}>
            <div className={css.name}>{messages.name}</div>
            <div className={css.link}>开通课堂派VIP</div>
          </div>
        </div>
      </Card>
      <div className='detail'>
        <Tabs items={items} />
      </div>
    </div>
  );
}
