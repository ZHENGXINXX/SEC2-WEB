import { Button, Modal, message } from 'antd';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import css from './index.module.less';
import Header from './Header';
import Sider from './Sider';
import Content from './Content';
import State from '@/tools/state';
import { studentPiges, teacherPiges } from '../api';

function Pigeonhole({getAll}, ref) {
  const [visible, setVis] = useState(false);
  const [courses, setCourses] = useState([{}]);
  const [sider, setSider] = useState([]);
  const [content, setContent] = useState([]);
  const [index, setIndex] = useState();
  useImperativeHandle(ref, () => ({ setVis }));

  const getPigeMap = (courses = [{}]) => {
    setContent([]);
    let m = new Map();
    let siders = [];
    courses.map((item, index) => {
      if (index === 0) {
        setIndex(item.time);
        setContent(item.teacherOrTeacherCourseDTOS);
      }
      siders[index] = item.time;
      m.set(item.time, item.teacherOrTeacherCourseDTOS);
    });
    setSider(siders);
    setCourses(m);
  };

  const getPigeCourses = async () => {
    let res;
    if (State.isTeacher) {
      res = await teacherPiges(State.userInfo.id);
    } else {
      res = await studentPiges(State.userInfo.id);
    }

    if (res[0]) {
      message.error(res[0].message);
    } else {
      getPigeMap(res[1].data);
    }
  };

  const getContent = (sider) => {
    setIndex(sider);
    setContent(courses.get(sider));
  };

  const onCancel = () => {
    setVis(false);
  };

  useEffect(() => {
    if (State.userInfo.id) {
      getPigeCourses();
    }
  }, []);

  return (
    <Modal
      title="归档课程"
      width={932}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button type='primary' key='confirm' onClick={onCancel}>确定</Button>
      ]}>
      <div className={css.modal}>
        <div>
          <Header />
        </div>
        <div className={css.content}>
          <div className={css.sider}>
            <Sider sider={sider} index={index} getContent={getContent} />
          </div>
          <div className={css.content}>
            <Content content={content} getAll={getAll} getPigeCourses={getPigeCourses}/>
          </div>
        </div>
      </div>
    </Modal >
  );
}
export default React.forwardRef(Pigeonhole);