import { DatePicker, Form, InputNumber, Modal, message } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import { submit } from '../api';

function SendModal({ getWork }, ref) {
  const [form] = Form.useForm();
  const [visible, setVis] = useState({ open: false, courseId: 0, taskId: 0 });
  useImperativeHandle(ref, () => ({ setVis }));

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  };

  const onCancel = () => {
    setVis({ open: false, courseId: 0, taskId: 0 });
  };

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      const data = {
        ...values,
        courseId:visible.courseId,
        taskId:visible.taskId,
        startTime:values.startTime.format('YYYY-MM-DD HH:mm:ss'),
        endTime:values.endTime.format('YYYY-MM-DD HH:mm:ss'),
      };
      const [error,resData] = await submit(data);
      if(error){
        message.error(error.message);
        onCancel();
        return;
      }

      if(resData.code === 200){
        message.success("发布作业成功");
        getWork(visible.courseId);
      }else{
        message.error(resData.message);
      }
      onCancel();
    });
  };

  const rules = [{ required: true, message: '不能为空' }];

  return (
    <Modal
      forceRender
      title='发布作业'
      width={500}
      open={visible.open}
      onOk={onFinish}
      afterClose={() => form.resetFields()}
      onCancel={onCancel}>
      <Form form={form} {...layout}>
        <Form.Item
          label="发布时间"
          name='startTime'
          rules={rules}>
          <DatePicker placeholder='请选择开始时间' showTime style={{ width: 300 }} />
        </Form.Item>

        <Form.Item
          label="截止时间"
          name='endTime'
          rules={rules}>
          <DatePicker placeholder='请选择截止时间' showTime style={{ width: 300 }} />
        </Form.Item>
        <Form.Item
          label='总分'
          name='totalScore'
          rules={rules}>
          <InputNumber placeholder='请输入作业总分' style={{ width: 300 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default React.forwardRef(SendModal);