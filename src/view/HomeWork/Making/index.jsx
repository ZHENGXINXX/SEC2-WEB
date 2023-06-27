import React, { useEffect, useRef, useState } from 'react';
import css from './index.module.less';
import { Button, Table, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { getList } from '../api';
import AchieveModal from './AchieveModal';

export default function Making({ data = {} }) {
  const ref = useRef();

  const [dataSource, setData] = useState([]);
  const { taskId } = useLocation().state;

  const setAchieve = (id) => {
    ref.current.setOpen({ visible: true, id });
  };

  const getData = async () => {
    const [error, resData] = await getList(taskId);

    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      setData(resData.data);
    } else {
      message.error(resData.message);
    }
  };

  const columns = [
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
      align: 'center',
      ellipsis: true
    },
    {
      title: '作业名称',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      ellipsis: true
    },
    {
      title: '批阅次数',
      dataIndex: 'correctionNum',
      key: 'correctionNum',
      align: 'center',
      ellipsis: true
    },
    {
      title: '批改状态',
      dataIndex: 'submitStatus',
      key: 'submitStatus',
      align: 'center',
      ellipsis: true
    },
    {
      title: '成绩',
      dataIndex: 'achievement',
      key: 'achievement',
      align: 'center',
      ellipsis: true
    },
    {
      title: '作业留言',
      dataIndex: 'homeworkMessage',
      key: 'homeworkMessage',
      align: 'center',
      ellipsis: true
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      render: (text) => (
        <>
          <Button type='link' onClick={() => { setAchieve(text.id); }}>打分</Button>
        </>
      )
    }
  ];

  useEffect(() => {
    getData();
  }, [taskId]);

  return (
    <div className={css.content}>
      <div className={css.detail}>
        <div className={css.title}>{data.title}</div>
        <div className={css.times}>
          <div className={css.type}>{data.type === 1 ? "个人作业" : "小组作业"}</div>
          <div className={css.type}>提交起止时间：{data.startTime} - {data.endTime}</div>
          <div className={css.limit}>{message.totalScore}</div>
          <div className={css.limit}>查重</div>
          <div className={css.limit}>允许超时提交</div>
        </div>
      </div>
      <Table columns={columns} dataSource={dataSource} rowKey='id' />
      <AchieveModal ref={ref} getData={getData} totalScore={data.totalScore} />
    </div>
  );
}