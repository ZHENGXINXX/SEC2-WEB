import React, { useRef } from 'react';
import Course from '@/components/Course';
import { Button, Card, Dropdown } from 'antd';
import css from './index.module.less';
import State from '@/tools/state';
import AddCourse from './AddCourse';
import CreateCourse from './CreateCourse';


export default function TopCourse({ topCourses, getAll }) {
  const addRef = useRef();
  const createRef = useRef();

  const add = () => {
    addRef.current.setVis(true);
  };

  const create = () => {
    createRef.current.setVis(true);
  };

  const items = [
    {
      key: 'create',
      label: (
        <span onClick={create}>
          创建课程
        </span>
      )
    },
    {
      key: 'add',
      label: (
        <span onClick={add}>
          加入课程
        </span>
      )
    },
  ];

  return (
    <div>
      {topCourses.length !== 0 ?
        <Card className={css.content}>
          <div className={css.top}>
            <div className={css.title}>置顶课程</div>
            {State.isTeacher ?
              <div className={css.operate}>
                <Dropdown menu={{ items }} type='primary' trigger={['click']} placement="bottom" overlayStyle={{ textAlign: "center" }}>
                  <Button type='primary'>+ 创建/加入课程</Button>
                </Dropdown>
              </div> : <div className={css.operate}>
                <Button type='primary' onClick={add}>+ 加入课程</Button>
              </div>}
          </div>
          <div className={css.courses}>
            {
              topCourses.map((item, index) => (
                <Course detail={item} key={index} getAll={getAll} />
              ))
            }
          </div>
        </Card>
        :
        State.isTeacher ?
          <div className={css.operate} style={{ width: '1150px', display: 'flex', justifyContent: 'space-between' }}>
            <div></div>
            <Dropdown menu={{ items }} type='primary' trigger={['click']} placement="bottom" overlayStyle={{ width: 100, textAlign: 'center' }}>
              <Button type='primary'>+ 创建/加入课程</Button>
            </Dropdown>
          </div> : <div className={css.operate} style={{ width: '1150px', display: 'flex', justifyContent: 'space-between' }}>
            <div></div>
            <Button type='primary' onClick={add}>+ 加入课程</Button>
          </div>
      }
      <AddCourse ref={addRef} getAll={getAll} />
      <CreateCourse ref={createRef} getAll={getAll} />
    </div>
  );
}