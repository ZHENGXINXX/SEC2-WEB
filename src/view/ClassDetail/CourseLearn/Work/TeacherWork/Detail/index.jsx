import React from 'react';
import css from './index.module.less';

export default function Detail({ name, value }) {
  return (
    <div className={css.det}>
      <div className={css.number}>{value}</div>
      <div className={css.name}>{name}</div>
    </div>
  );
}
