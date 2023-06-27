import React, { useEffect, useState } from 'react';
import css from './index.module.less';
import Members from './Members';
import { Card, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { getList } from './api';

export default function Member() {
  const [index, setIndex] = useState(true);
  const [stuData, setStuData] = useState([]);
  const [teaData, setTeaData] = useState([]);
  const { courseId } = useLocation().state;

  const getMembers = async (id) => {
    const [error, resData] = await getList(id);
    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      resData.data.map((item)=>{
        if(item.role === '老师'){
          setTeaData(item.list);
        }else if(item.role === '学生'){
          setStuData(item.list);
        }
      });
    } else {
      message.error(resData.message);
    }
  };

  useEffect(() => {
    if (courseId)
      getMembers(courseId);
  }, []);
  return (
    <div className={css.member}>
      <div className={css.content}>
        <Card className={css.groups}>
          <div className={css.header}>全部成员</div>
          <div
            className={css.group}
            onClick={() => setIndex(true)}
            style={{ backgroundColor: index ? '#e8f0ff' : '' }}>教师团队</div>
          <div
            className={css.group}
            onClick={() => setIndex(false)}
            style={{ backgroundColor: index ? '' : '#e8f0ff' }}>全部成员</div>
        </Card>
        <Members stuData={stuData} teaData={teaData} index={index}/>
      </div>
    </div>
  );
}
