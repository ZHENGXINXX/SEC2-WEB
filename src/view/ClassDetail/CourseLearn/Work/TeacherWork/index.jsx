import React from 'react';
import css from './index.module.less';
import { DingtalkOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Detail from './Detail';
import { Dropdown } from 'antd';

export default function TeacherWork({ task = {} }) {
  const navigate = useNavigate();

  const toHomeWork = () => {
    navigate('/homework');
  };

  const items = [
    {
      key: 'shezhi',
      label: (
        <span>
          删除
        </span>
      )
    },
    {
      key: 'logout',
      label: (
        <span>
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
              <div className={css.data}>
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
    </div>
  );
}
