import React from 'react';
import Work from './Work';
import { Tabs } from 'antd';
import './index.less';

export default function CourseLearn() {

  const items = [
    {
      key: 'work',
      label: <div className='other'>作业</div>,
      children: <Work></Work>
    },
  ];

  return (
    <div className='content'>
      <Tabs items={items} />
    </div>
  );
}
