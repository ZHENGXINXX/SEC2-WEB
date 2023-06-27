import React, { useEffect, useState } from 'react';
import css from './index.module.less';
import { Card, message } from 'antd';
import { useLocation } from 'react-router-dom';
import File from './File';
import { detail } from '../api';

export default function Detail() {
  const [mes, setMes] = useState({});
  const [file, setFile] = useState();
  const { taskId } = useLocation().state;

  const getDetail = async (id) => {
    const [error, resData] = await detail(id);
    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      setMes(resData.data);
      setFile(resData.data.jobAttachments);
    } else {
      message.error(resData.message);
    }
  };

  useEffect(() => {
    getDetail(taskId);
  }, []);

  return (
    <div className={css.content}>
      <Card className={css.card}>
        <div className={css.prompt}>作业</div>
        <div className={css.detail}>
          <div className={css.title}>{mes.title}</div>
          <div className={css.times}>
            <div className={css.type}>{mes.type === 1 ? "个人作业" : "小组作业"}</div>
            <div className={css.type}>提交起止时间： {mes.startTo}</div>
            <div className={css.limit}>{message.totalScore}</div>
            <div className={css.limit}>查重</div>
            <div className={css.limit}>允许超时提交</div>
          </div>
          <div className={css.decription}>{mes.jobDescription}</div>
        </div>
      </Card>
      <File file={file} />
    </div>
  );
}