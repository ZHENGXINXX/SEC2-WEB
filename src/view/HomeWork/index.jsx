import React, { useEffect, useState } from 'react';
import Detail from './Detail';
import Submit from './Submit';
import State from '@/tools/state';
import Making from './Making';
import { Tabs, message } from 'antd';
import './index.less';
import { useLocation } from 'react-router-dom';
import { detail } from './api';

export default function HomeWork() {
  const { index } = useLocation().state;
  const [file, setFile] = useState();
  const [data, setData] = useState();
  const { taskId } = useLocation().state;

  const getDetail = async (id) => {
    const [error, resData] = await detail(id);
    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      setData(resData.data);
      setFile(resData.data.jobAttachments);
    } else {
      message.error(resData.message);
    }
  };

  useEffect(() => {
    getDetail(taskId);
  }, []);

  const items = [
    {
      key: 'detail',
      label: <span>详情</span>,
      children: <Detail data={data} file={file} />
    },
    State.isStudent ?
      {
        key: 'submit',
        label: <span>提交作业</span>,
        children: <Submit data={data} file={file} />
      } :
      {
        key: 'making',
        label: <span>批阅</span>,
        children: <Making data={data} />
      }
  ];

  return (
    <div className='homework'>
      <Tabs items={items} defaultActiveKey={index ? index : "detail"} />
    </div>
  );
}