import React from 'react';
import css from './index.module.less';

export default function None() {
  return (
    <div className={css.content}>
      <img src='https://www.ketangpai.com/img/img_empty.84d0931c.png' />
      <br />
      <span>暂无数据</span>
    </div>
  );
}
