import React, { useRef } from 'react';
import css from './index.module.less';
import { DingtalkOutlined, MoreOutlined } from '@ant-design/icons';
import { WarningOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Detail from './Detail';
import { Dropdown, Modal, message } from 'antd';
import { delWork } from '../api';
import EditModal from '../EditModal';

export default function TeacherWork({ task = {}, getWork }) {
  const navigate = useNavigate();
  const { courseId } = useLocation().state;
  const editRef = useRef();

  const toHomeWork = () => {
    navigate('/homework', { state: { index: 'detail', taskId: task.taskId } });
  };

  const toMaking = () => {
    navigate('/homework', { state: { index: 'making', taskId: task.taskId } });
  };

  const del = async () => {
    const [error, resData] = await delWork(task.taskId);
    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      message.success("删除作业成功");
      getWork(courseId);
    } else {
      message.error(resData.message);
    }
  };

  const onDel = () => {
    Modal.confirm({
      title: '提示?',
      icon: <WarningOutlined style={{ color: 'red' }} />,
      width: 600,
      content: <div style={{ padding: '30px 0', fontSize: 20 }}>确定要删除该作业吗，删除后该课程所有作业信息都将消失</div>,
      okText: '删除',
      cancelText: '取消',
      onOk: del
    });
  };

  const edit = () => {
    editRef.current.setVis({ open: true, courseId: courseId, taskId: task.taskId });
  };

  const items = [
    {
      key: 'shezhi',
      label: (
        <span onClick={onDel}>
          删除
        </span>
      )
    },
    {
      key: 'logout',
      label: (
        <span onClick={edit}>
          编辑
        </span>
      )
    },
  ];

  return (
    <div className={css.work}>
      <div className={css.left}>
        <img src='https://www.ketangpai.com/images/web2x_zuoye.png' />
        <div className={css.name}>作业</div>
      </div>
      <div className={css.right}>
        <div className={css.detail}>
          <div className={css.name} onClick={toHomeWork}>{task.title}</div>
          <div className={css.times}>
            <div className={css.subclass}>{task.state === 1 ? "已发布" : "未发布"}</div>
            <span></span>
            {task.state === 1 ?
              <>
                <div className={css.subclass}>提交截止时间：{task.endTime}</div>
                <span></span>
              </> :
              <></>}
            <div className={css.subclass}>{task.type === 1 ? '个人作业' : '小组作业'}</div>
          </div>
        </div>
        <div className={css.operate}>
          <div className={css.left1}>
            {task.state === 1 ?
              <div className={css.data} onClick={toMaking}>
                <Detail name='已批完' value='0' />
                <Detail name='未批完' value='0' />
                <Detail name='已交' value='0' />
              </div> :
              <div style={{ marginRight: 20 }}>
                <DingtalkOutlined style={{ fontSize: 30 }} />
                <div>发布</div>
              </div>
            }
          </div>
          <div className={css.change}>
            <div className={css.apart}></div>
            <Dropdown menu={{ items }} trigger={['click']} placement="bottom" overlayStyle={{ width: 150, textAlign: "center" }}>
              <MoreOutlined style={{ fontSize: 30, height: 50 }} />
            </Dropdown>
          </div>
        </div>
      </div>
      <EditModal ref={editRef} />
    </div>
  );
}
