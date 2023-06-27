import React from 'react';
import css from './index.module.less';
import { Card } from 'antd';
import File from '../../File';

export default function ShowFile({ detail, file }) {
  return (
    <Card className={css.card}>
      <div className={css.top}>
        <div className={css.score}>{detail.achievement}</div>
        <div className={css.name}>已提交</div>
      </div>
      <div className={css.bottom}>
        <div className={css.title}>
          作业附件
          <span>1个</span>
        </div>
        <File file={file} width={1180}/>
      </div>
    </Card>
  );
}
