import { Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import css from './index.module.less';
import CourseLearn from './CourseLearn';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCourse } from './api';

export default function classDetail() {
  const { courseId } = useLocation().state;
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [detail, setDetial] = useState({});

  const changeIndex = (value) => {
    setIndex(value);
  };

  const items = [
    {
      name: '课程学习',
    },
    {
      name: '学情分析',
    },
    {
      name: '成绩管理',
    },
    {
      name: '课程介绍',
    },
  ];

  const getCourseDetail = async (id) => {
    const [error,resData] = await getCourse(id);

    if(error){
      message.error(error.message);
      return;
    }

    if(resData.code === 200){
      setDetial(resData.data);
    }else{
      message.error(resData.message);
    }
  };

  const toMembers = ()=>{
    navigate('/members',{state:{courseId:courseId}});
  };

  useEffect(() => {
    if (courseId)
      getCourseDetail(courseId);
  }, [courseId]);

  return (
    <div className={css.content}>
      <Card className={css.card}>
        <div className={css.top}>
          <h1>{detail.name}</h1>
          <h2>{detail.clazz}</h2>
          <div className={css.detail}>
            <div className={css.yard}>加课码 {detail.courseCode}</div>
            <div className={css.number} onClick={toMembers}>已有{detail.joinNumber}人加入</div>
          </div>
          <div className={css.button}>
            <button disabled>暂无课堂</button>
          </div>
        </div>
        <div className={css.bottom}>
          <div className={css.button}>
            {items.map((items, i) => (
              <div
                key={i}
                className={css.option}
                onClick={() => changeIndex(i)}
                style={i === index ? { backgroundColor: '#e8f0ff', color: '#4285f4', borderRadius: '10px' } : {}}>
                {items.name}
              </div>
            ))}
          </div>
        </div>
      </Card>
      <CourseLearn />
    </div>
  );
}
