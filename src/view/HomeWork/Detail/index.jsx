import React from 'react';
import css from './index.module.less';
import { Card } from 'antd';

export default function Detail() {
  return (
    <div className={css.content}>
      <Card className={css.card}>
        <div className={css.prompt}>作业</div>
        <div className={css.detail}>
          <div className={css.title}>《程序设计基础》实验八、九</div>
          <div className={css.times}>
            <div className={css.type}>个人作业</div>
            <div className={css.type}>提交起止时间： 21/11/19 12:17~21/12/15 23:00</div>
            <div className={css.limit}>100分</div>
            <div className={css.limit}>分查重</div>
            <div className={css.limit}>允许超时提交</div>
          </div>
          <div className={css.request}></div>
        </div>
      </Card>
    </div>
  );
}