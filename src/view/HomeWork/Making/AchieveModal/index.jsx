import { Form, InputNumber, Modal, message } from 'antd';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { correct, submitDetail } from '../../api';
import File from '../../File';

function AchieveModal({ getData, totalScore }, ref) {
  const [form] = Form.useForm();
  const [file, setFile] = useState();
  const [open, setOpen] = useState({ visible: false, id: 0 });
  useImperativeHandle(ref, () => ({ setOpen }));

  const onCancel = () => {
    setOpen({ visible: false, id: 0 });
  };

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      values.id = open.id;
      const [error, resData] = await correct(values);
      if (error) {
        message.error(error.message);
        onCancel();
        return;
      }

      if (resData.code === 200) {
        message.success("打分成功");
        getData();
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
      setFile(resData.data.submitHomeworkFiles);
    } else {
      message.error(resData.message);
    }
  };

  useEffect(() => {
    if (open.id)
      getDetail(open.id);
  }, [open.id]);

  return (
    <Modal
      title='打分'
      width={700}
      open={open.visible}
      onOk={onFinish}
      onCancel={onCancel}
      afterClose={() => form.resetFields()}>
      <Form form={form} style={{ padding: '30px 0' }}>
        <Form.Item
          name='achievement'
          label='成绩'
          style={{marginBottom:50}}>
          <InputNumber placeholder='请输入该学生成绩' style={{ width: 550 }} max={totalScore} />
        </Form.Item>
        <File file={file} width={600} />
      </Form>
    </Modal>
  );
}
export default React.forwardRef(AchieveModal);