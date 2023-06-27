import React, { useEffect, useState } from 'react';
import css from './index.module.less';
import { Form, Modal, message } from 'antd';
import UploadFile from './UploadFile';
import { useLocation } from 'react-router-dom';
import State from '@/tools/state';
import { submit, submitDetail } from '../api';
import ShowFile from './ShownFile';

export default function Submit({ data = {} }) {
  const [visible, setVis] = useState(false);
  const [detail, setDetail] = useState();
  const [file, setFile] = useState();
  const [state, setState] = useState(2);
  const { taskId, id } = useLocation().state;
  const [form] = Form.useForm();

  const onSubmit = () => {
    setVis(true);
  };

  const onCancel = () => {
    setVis(false);
  };

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      if (!values.file) {
        message.error("请先选择文件后提交");
        return;
      }
      const data = {
        ...values,
        file: values.file.file,
        taskId: taskId,
        id: id,
        studentId: State.userInfo.id
      };
      const [error, resData] = await submit(data);
      if (error) {
        message.error(error.message);
        onCancel();
        return;
      }

      if (resData.code === 200) {
        message.success("提交作业成功");
        getDetail(id);
      } else {
        message.error(resData.message);
      }
      onCancel();

    });
  };

  const getDetail = async (id) => {
    const [error, resData] = await submitDetail(id);
    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      setDetail(resData.data);
      setFile(resData.data.submitHomeworkFiles);
      setState(resData.data.submitStatus);
    } else {
      message.error(resData.message);
    }
  };

  useEffect(() => {
    getDetail(id);
  }, [id]);

  const changeState = () => {
    setState(2);
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
            <div className={css.name}>{ }</div>
            <div className={css.show}>查看谁提交了</div>
          </div>
          <div className={css.bottom}>
            <div className={css.type}>{data.type === 1 ? "个人作业" : "小组作业"}</div>
            <div className={css.type}>提交起止时间：{data.startTime} - {data.endTime}</div>
            <div className={css.limit}>{data.totalScore}</div>
            <div className={css.limit}>查重</div>
          </div>
        </div>
      </div>
      <div className={css.line}></div>
      <div className={css.submit}>
        <div className={css.name}>提交内容</div>
        <div className={css.button}>
          {state === 2 ?
            <button onClick={onSubmit}>确认提交</button> :
            <button onClick={changeState}>更新提交</button>}
        </div>
      </div>
      {state == 2 ?
        <UploadFile form={form} /> :
        <ShowFile detail={detail} file={file} />}

      <Modal
        title='确认提交'
        open={visible}
        width={550}
        onOk={onFinish}
        onCancel={onCancel}>
        <div style={{ padding: 50, fontSize: 20 }}>成功提交后，作业截至时间前且老师未批<br />改本作业时，可随时正常更新提交的作业</div>
      </Modal>
    </div>
  );
}