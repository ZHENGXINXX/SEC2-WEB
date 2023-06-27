import React, { useEffect, useRef, useState } from 'react';
import css from './index.module.less';
import AddModal from './AddModal';
import State from '@/tools/state';
import TeacherWork from './TeacherWork';
import { useLocation } from 'react-router-dom';
import { getStuWork, getTeaWork } from './api';
import { message } from 'antd';
import StudentWork from './StudentWork';

export default function Work() {
  const ref = useRef();
  const { courseId } = useLocation().state;
  const [tasks, setTasks] = useState([]);

  const add = () => {
    ref.current.setVis({ open: true, courseId: courseId });
  };

  const getWork = async (courseId) => {
    let res;
    if (State.isTeacher) {
      res = await getTeaWork(courseId);
    } else {
      res = await getStuWork({ courseId, studentId: State.userInfo.id });
    }

    if (res[0]) {
      message.error(res[0].message);
      return;
    }

    if (res[1].code === 200) {
      setTasks(res[1].data);
    } else {
      message.error(res[1].error);
    }
  };

  useEffect(() => {
    getWork(courseId);
  }, [courseId]);

  return (
    <div className={css.content}>
      <div className={css.top}>
        <div className={css.left}>共{tasks.length}个活动</div>
        {State.isTeacher ?
          <div className={css.right}>
            <button onClick={add}>+ 添加作业</button>
          </div> : <></>
        }
      </div>
      {tasks.length === 0 ?
        <></> :
        <div className={css.box}>
          {tasks.map((item, index) => {
            if (State.isTeacher) {
              return <TeacherWork task={item} key={index} getWork={getWork}/>;
            }
            return <StudentWork task={item} key={index} />;
          })}

        </div>
      }
      <AddModal ref={ref} getWork={getWork}/>
    </div>
  );
}
