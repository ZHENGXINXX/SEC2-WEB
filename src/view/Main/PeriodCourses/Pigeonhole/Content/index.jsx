import React from 'react';
import css from './index.module.less';
import Course from './Course';

export default function Content({ content,getAll,getPigeCourses }) {
  return (
    <div className={css.content}>
      {
        content.map((item, index) => (
          <Course item={item} key={index} getAll={getAll} getPigeCourses={getPigeCourses}/>
        ))
      }
    </div>
  );
}
