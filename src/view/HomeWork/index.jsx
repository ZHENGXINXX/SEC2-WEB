import React from 'react';
import Detail from './Detail';
import Submit from './Submit';
import State from '@/tools/state';
import Making from './Making';
import { Tabs } from 'antd';
import './index.less';
import { useLocation } from 'react-router-dom';

export default function HomeWork() {

  const { index } = useLocation().state;

  const items = [
    {
      key: 'detail',
      label: <span>详情</span>,
      children: <Detail />
    },
    State.isStudent ?
      {
        key: 'submit',
        label: <span>提交作业</span>,
        children: <Submit />
      } :
      {
        key: 'making',
        label: <span>批阅</span>,
        children: <Making />
      }
  ];

  return (
    <div className='homework'>
      <Tabs items={items} defaultActiveKey={index ? index : "detail"} />
    </div>
  );
}