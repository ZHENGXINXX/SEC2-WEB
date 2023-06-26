import { Collapse, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { CaretUpOutlined } from '@ant-design/icons';
import css from './index.module.less';
import Course from '@/components/Course';

export default function CollapseBoard({ courses }) {
  const [periodCourse, setCourses] = useState([]);
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: '1px solid lightgray',
  };
  const getCoursesByPer = (courses) => {
    const cours = courses.map((item, index) => {
      return {
        key: index,
        label: item.time,
        children: <div className={css.courses}>
          {item.teacherOrTeacherCourseDTOS.map((e, i) => {
            return <Course detail={e} key={i}/>;
          })}
        </div>,
        style: panelStyle
      };
    });
    setCourses(cours);
  };

  useEffect(() => {
    if (courses)
      getCoursesByPer(courses);
  }, [courses]);

  return (
    <>
      <Collapse
        ghost
        collapsible='header'
        expandIconPosition={'end'}
        className={css.content}
        defaultActiveKey={0}
        expandIcon={({ isActive }) => (
          <div className={css.show}>
            <CaretUpOutlined rotate={isActive ? 180 : 0} className={css.img} />
            <span className={css.name}>{isActive ? '收起' : '展开'}</span>
          </div>)}
        items={periodCourse}
      />
    </>
  );
}