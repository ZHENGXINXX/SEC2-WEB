import React from 'react';
import css from './index.module.less';
import { UnorderedListOutlined } from '@ant-design/icons';
import State from '@/tools/state';
import { Dropdown, message } from 'antd';
import { pigeStudet, pigeTeacher } from './api';

export default function Course({ item, getAll,getPigeCourses }) {

  const del = () => {

  };

  const restore = async () => {
    let res;
    const values = {
      isFile: 2,
      id: State.userInfo.id,
      courseId: item.courseId
    };
    if (State.isStudent) {
      res = await pigeStudet(values);
    } else {
      res = await pigeTeacher(values);
    }

    if (res[0]) {
      message.error(res[0].message);
      return;
    } else {
      getAll(State.userInfo.id);
      getPigeCourses();
    }
  };

  const items = [
    {
      key: '取消',
      label: (
        <span onClick={restore}>恢复</span>
      )
    },
    {
      key: '删除',
      label: (
        <span onClick={del}>删除</span>
      )
    }
  ];

  return (
    <div className={css.content}>
      <div className={css.center}>
        <div className={css.left}>
          <div className={css.type}>{State.isTeacher ? "教" : "学"}</div>
          <div className={css.capatch}>加课码 {item.courseCode}</div>
        </div>
        <div className={css.right}>
          <div className={css.top}>
            <div className={css.name}>{item.courseIntroduction}</div>
            <div className={css.operate}>
              <Dropdown menu={{ items }} type='primary' trigger={['click']} placement="bottom" overlayStyle={{ width: 80, textAlign: 'center' }}>
                <UnorderedListOutlined className={css.img} />
              </Dropdown>
            </div>
          </div>
          <div className={css.middle}>{item.semester}</div>
          <div className={css.bottom}>{item.teachingMode}</div>
        </div>
      </div>
    </div>
  );
}
