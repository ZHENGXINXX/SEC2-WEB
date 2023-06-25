import React from 'react';
import Detail from './Detail';
import Submit from './Submit';
import { Tabs } from 'antd';
import './index.less';

export default function HomeWork() {

  const items = [
    {
      key:'detail',
      label:<span>详情</span>,
      children:<Detail />
    },
    {
      key:'submit',
      label:<span>提交作业</span>,
      children:<Submit />
    }
  ];

  return (
    <div className='homework'>
      <Tabs items={items}/>
    </div>
  );
}