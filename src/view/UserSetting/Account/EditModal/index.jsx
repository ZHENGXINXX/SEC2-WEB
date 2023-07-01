import { DatePicker, Form, Input, Modal, message } from 'antd';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { detail, update } from '../../api';
import moment from 'moment';

function EditModal({ updateList }, ref) {
  const [form] = Form.useForm();
  const [visible, setVis] = useState({visible:false,id:0});
  const [messages, setMessages] = useState({});

  useImperativeHandle(ref, () => ({ setVis }));

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      values.id = visible.id;
      if(values.intake){
        values.intake = values.intake.format('YYYY-MM-DD');
      }
      const [error, resData] = await update(values);
      if (error) {
        message.error(error.message);
        onCancel();
        return;
      }

      if (resData.code === 200) {
        message.success("修改成功");
        updateList(visible.id);
        onCancel();
      } else {
        message.error(resData.message);
      }
    });
  };

  const onCancel = () => {
    setVis({visible:false,id:0});
  };

  const getMessage = async (id) => {
    const [error, resData] = await detail(id);
    if (error) {
      message.error(error.messages);
      return;
    }

    if (resData.code === 200) {
      const data ={
        ...resData.data,
        intake:moment(resData.data.intake, 'YYYY-MM-DD')
      };
      form.setFieldsValue(data);
      setMessages(data);
    } else {
      message.error(resData.message);
    }
  };

  useEffect(() => {
    if (visible.id > 0)
      getMessage(visible.id);
  }, [visible.id]);

  const rule = [{ required: true, message: '不能为空' }];
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };

  return (
    <Modal
      forceRender
      title="修改基础信息"
      width={650}
      open={visible.visible}
      afterClose={()=>form.resetFields()}
      onOk={onFinish}
      onCancel={onCancel}>
      <Form preserve={false} form={form}>
        <Form.Item
          label="姓名"
          name="name"
          rules={rule}
          {...layout}>
          <Input placeholder='请输入姓名' />
        </Form.Item>

        <Form.Item
          label={messages.role === 1 ? '工号' : '学号'}
          name="studentTeacherId"
          rules={rule}
          {...layout}>
          <Input placeholder={messages.role === 1 ? '请输入工号' : '请输入学号'} />
        </Form.Item>

        <Form.Item
          label="学院"
          name="school"
          rules={rule}
          {...layout}>
          <Input placeholder='请输入学员' />
        </Form.Item>

        <Form.Item
          label="院系"
          name="department"
          rules={rule}
          {...layout}>
          <Input placeholder='请输入院系' />
        </Form.Item>

        <Form.Item
          label="专业"
          name="speciality"
          rules={rule}
          {...layout}>
          <Input placeholder='请输入专业' />
        </Form.Item>

        {messages.role === 2 ? <>
          <Form.Item
            label="班级"
            name="clazz"
            rules={rule}
            {...layout}>
            <Input placeholder='请输入班级' />
          </Form.Item>

          <Form.Item
            label="入学时间"
            name="intake"
            {...layout}>
            <DatePicker placeholder='请输入入学时间' />
          </Form.Item>
        </> : <>
          <Form.Item
            label="所授课程"
            name="coursesTaught"
            rules={rule}
            {...layout}>
            <Input placeholder='请输入人所授课程' />
          </Form.Item>
        </>}
      </Form>
    </Modal>
  );
}
export default React.forwardRef(EditModal);
