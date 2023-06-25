import React from 'react';
import css from './index.module.less';
import { useNavigate } from 'react-router-dom';

export default function StudentWork({ task }) {
  const navigate = useNavigate();

  const toHomeWork = () => {
    navigate('/homework');
  };


  return (
    <div className={css.work}>
      <div className={css.left}>
        <img src='https://www.ketangpai.com/images/web2x_zuoye.png' />
        <div className={css.name}>作业</div>
      </div>
      <div className={css.right}>
        {task &&
          <div className={css.detail}>
            <div className={css.name} onClick={toHomeWork}>{task.title}</div>
            <div className={css.times}>
              <div className={css.subclass}>提交截止时间：{task.endTime}</div>
              <span>|</span>
              <div className={css.subclass}>已结束</div>
              <span>|</span>
              <div className={css.subclass}>{task.type === 1 ? '个人作业' : '小组作业'}</div>
            </div>
            <div className={css.status}>{task.submitStatus === 2 ? '未提交' : '已提交'}</div>
          </div>
        }
        <div className={css.button}>
          <button type='button'>提交作业</button>
        </div>
      </div>
    </div>
  );
}
