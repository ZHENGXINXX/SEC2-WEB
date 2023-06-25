import React, { useEffect, useState } from 'react';
import TopCourse from './TopCourse';
import PeriodCourses from './PeriodCourses';
import css from './index.module.less';
import State from '@/tools/state';
import { studentCourse, studentTop, teacherCourse, teacherTop } from './api';
import { message } from 'antd';

export default function Student() {
  const [topCourses, setTopCourses] = useState([]);
  const [courses, setCourses] = useState([]);

  const getTopCourses = async (id) => {
    let res;
    if (State.isStudent) {
      res = await studentTop(id);
    } else {
      res = await teacherTop(id);
    }

    if (res[0]) {
      message.error(res[0].message);
      return;
    } else if (res[1].code === 200) {
      setTopCourses(res[1].data);
    } else {
      message.error(res[1].message);
    }
  };

  const getCourses = async (id) => {
    let res;
    if (State.isStudent) {
      res = await studentCourse(id);
      window.console.log(res);
    } else {
      res = await teacherCourse(id);
    }

    if (res[0]) {
      message.error(res[0].message);
      return;
    } else if (res[1].code === 200) {
      setCourses(res[1].data);
    } else {
      message.error(res[1].message);
    }
  };

  const getAll = async (id) => {
    getCourses(id);
    getTopCourses(id);
  };

  useEffect(() => {
    getAll(State.userInfo.id);
  }, [State.userRole]);

  return (
    <div className={css.content}>
      <TopCourse topCourses={topCourses} getAll={getAll} />
      <PeriodCourses courses={courses} getAll={getAll} />
    </div>
  );
}