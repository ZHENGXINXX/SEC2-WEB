import { Card, Dropdown, Modal, message } from 'antd';
import React from 'react';
import css from './index.module.less';
import { useNavigate } from 'react-router-dom';
import { UnorderedListOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import State from '@/tools/state';
import { changeStudent, changeTeacher, pigeStudet, pigeTeacher } from './api';

export default function Course({ detail, period }) {
  const navigate = useNavigate();

  const pige = async () => {
    let res;
    const values = {
      isFile: 1,
      id: State.userInfo.id,
      courseId: detail.courseId
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
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  };

  const onPige = () => {
    Modal.confirm({
      title: '提示?',
      icon: <ExclamationCircleOutlined />,
      content: '确定要归档吗',
      okText: '归档自己',
      cancelText: '取消',
      onOk: pige
    });
  };

  const items = [
    {
      key: '归档',
      label: (
        <span onClick={onPige}>归档</span>
      )
    },
    {
      key: '退课',
      label: (
        <span>退课</span>
      )
    }
  ];

  const toDetail = () => {
    navigate('./classDetail', { state: { courseId: detail.courseId, students: detail.studentCount } });
  };

  const changeTop = async () => {
    let res;
    const isTopping = detail.isTopping === 1 ? 2 : 1;
    const id = State.userInfo.id;
    const values = {
      id,
      isTopping,
      courseId: detail.courseId
    };
    if (State.isStudent) {
      res = await changeStudent(values);
    } else {
      res = await changeTeacher(values);
    }

    if (res[0]) {
      message.error(res[0].message);
      return;
    } else {
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <Card
      hoverable
      className={css.card}>
      {detail && <>
        <div className={css.course} onClick={toDetail}>
          <div className={css.semester}>{period}</div>
          <div className={css.title}>{detail.name}</div>
          <div className={css.class}>{detail.courseId}</div>
          <div className={css.yard}>加课码:&nbsp;{detail.courseCode}</div>
        </div>
        <div className={css.detail}>
          <div className={css.left}>
            <div className={css.type}>{State.isStudent ? "学" : "教"}</div>
            {State.isStudent
              ? <div>负责人：{detail.teacherName}</div>
              : <div>成员数量：{detail.studentCount}</div>
            }

          </div>
          <div className={css.right}>
            <div className={css.name} onClick={changeTop}>{detail.isTopping === 1 ? "取消置顶" : "置顶课程"}</div>
            <div>
              <Dropdown menu={{ items }} type='primary' trigger={['click']} placement="bottom" overlayStyle={{ width: 80, textAlign: 'center' }}>
                <UnorderedListOutlined className={css.img} />
              </Dropdown>
            </div>
          </div>
        </div>
      </>}
    </Card>
  );
}
