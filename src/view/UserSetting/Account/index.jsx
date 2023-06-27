import React, { useRef } from 'react';
import css from './index.module.less';
import OneRow from './OneRow';
import RoleModal from './RoleModal';
import PasRef from './PasswordModal';
import EditModal from './EditModal';
import State from '@/tools/state';

export default function Account({ messages, update }) {
  const roleRef = useRef();
  const pasRef = useRef();
  const eidtRef = useRef();
  const id = State.userInfo.id;

  const changeRole = () => {
    roleRef.current.setVis({ visible: true, role: messages.role });
  };

  const changePas = () => {
    pasRef.current.setVis(true);
  };

  const edit = () => {
    eidtRef.current.setVis({ visible: true, id });
  };

  return (
    <div className={css.content}>
      <div className={css.title}>
        <div className={css.name}>账号设置</div>
        <div className={css.operate}></div>
      </div>
      {messages && <>
        <div className={css.list}>
          <OneRow name='账号' value={messages.accountNumber}></OneRow>
          <OneRow name='所属角色' value={messages.role === 1 ? '老师' : "学生"} operate='去设置' event={changeRole}></OneRow>
          <OneRow name='手机号' value={messages.phone} operate=''></OneRow>
          <OneRow name='密码' value='******' operate='修改密码' event={changePas}></OneRow>
        </div>
        <div className={css.title}>
          <div className={css.name}>基础信息</div>
          <div className={css.operate} onClick={edit}>编辑</div>
        </div>
        <div className={css.list}>
          <OneRow name='姓名' value={messages.name} />
          <OneRow name={messages.role === 1 ? '工号' : '学号'} value={messages.studentTeacherId} />
          <OneRow name='学校' value={messages.school} />
          <OneRow name='院系' value={messages.department} />
          <OneRow name='专业' value={messages.speciality} />
          {messages.role === 2 ? <>
            <OneRow name='班级' value={messages.clazz} />
            <OneRow name='入学时间' value={messages.intake} />
          </> : <>
            <OneRow name='所授课程' value={messages.coursesTaught} />
          </>}

        </div>
        <div className={css.title}>
          <div className={css.name}>第三方账号绑定</div>
          <div className={css.operate}></div>
        </div>
        <div className={css.list}>
          <OneRow name='邮箱绑定' value={messages.mailbox} />
          <OneRow name='微信绑定' value={messages.wechat} />
        </div>
      </>
      }
      <RoleModal ref={roleRef} updateList={update} />
      <PasRef ref={pasRef} updateList={update} />
      <EditModal ref={eidtRef} updateList={update} />
    </div>
  );
}
