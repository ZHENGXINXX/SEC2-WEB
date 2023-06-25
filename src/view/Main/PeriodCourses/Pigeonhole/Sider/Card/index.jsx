import React from 'react';
import css from './index.module.less';

export default function Card({ title, style, getContent }) {
  return (
    <div
      className={css.size}
      style={style}
      onClick={(e) => getContent(e.target.innerText)}>{title}</div>
  );
}
