import React, { useState } from 'react';
import css from './index.module.less';
import { Form, Modal, message } from 'antd';
import UploadFile from './UploadFile';
export default function Submit() {
  const [visible, setVis] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = () => {
    setVis(true);
  };

  const onCancel = () => {
    setVis(false);
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      if (!values.file) {
        message.error("请先选择文件后提交");
        return;
      }
    });
  };

  return (
    <div className={css.submit}>
      <div className={css.work}>
        <div className={css.left}>
          <img src='https://www.ketangpai.com/images/web2x_zuoye.png' />
          <div className={css.name}>作业</div>
        </div>
        <div className={css.right}>
          <div className={css.top}>
            <div className={css.name}>考核大作业</div>
            <div className={css.show}>查看谁提交了</div>
          </div>
          <div className={css.bottom}>
            <div className={css.type}>个人作业</div>
            <div className={css.type}>提交起止时间： 23/05/17 17:16~23/05/31 00:00</div>
            <div className={css.limit}>100分</div>
            <div className={css.limit}>查重</div>
          </div>
        </div>
      </div>
      <div className={css.line}></div>
      <div className={css.submit}>
        <div className={css.name}>提交内容</div>
        <div className={css.button}>
          <button onClick={onSubmit}>确认提交</button>
        </div>
      </div>
      <UploadFile form={form} />
      <Modal
      title='确认提交'
      open={visible}
      width={550}
      onOk={onFinish}
      onCancel={onCancel}>
      <div style={{padding:50,fontSize:20}}>成功提交后，作业截至时间前且老师未批<br />改本作业时，可随时正常更新提交的作业</div>
    </Modal>
    </div>
  );
}