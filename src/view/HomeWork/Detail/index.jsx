import React, { } from 'react';
import css from './index.module.less';
import { Card, message } from 'antd';
import File from '../File';

export default function Detail({ data = {}, file }) {

  return (
    <div className={css.content}>
      <Card className={css.card}>
        <div className={css.prompt}>作业</div>
        <div className={css.detail}>
          <div className={css.title}>{data.title}</div>
          <div className={css.times}>
            <div className={css.type}>{data.type === 1 ? "个人作业" : "小组作业"}</div>
            <div className={css.type}>提交起止时间：{data.startTime} - {data.endTime}</div>
            <div className={css.limit}>{message.totalScore}</div>
            <div className={css.limit}>查重</div>
            <div className={css.limit}>允许超时提交</div>
          </div>
          <div className={css.decription}>{data.jobDescription}</div>
        </div>
      </Card>
      <File file={file} />
    </div>
  );
}