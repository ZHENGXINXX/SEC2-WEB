import React from 'react';
import css from './index.module.less';
import Card from './Card';

export default function Sider({ sider, index, getContent }) {
  return (
    <div className={css.sider}>
      {
        sider.map((item, i) => (
          <Card
            title={item}
            key={i}
            getContent={getContent}
            style={item === index ? { borderLeft: '2px solid #4285f4', color: '#4285f4', backgroundColor: '#e8f0ff' } : {}} />
        ))
      }
    </div>
  );
}
