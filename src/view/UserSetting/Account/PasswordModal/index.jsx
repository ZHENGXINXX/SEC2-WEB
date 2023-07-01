import { Form, Input, Modal, message } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import { changePassword } from '../../api';
import State from '@/tools/state';

function PasswordModal({updateList}, ref) {
  const [form] = Form.useForm();
  const [visible, setVis] = useState(false);
  const [password, setPassword] = useState();
  const id = State.userInfo.id;

  useImperativeHandle(ref, () => ({ setVis }));

  const onCancel = () => {
    setVis(false);
  };

  const onFinish = () => {
    form.validateFields()
      .then(async (values) => {
        values.id = id;
        const [error, resData] = await changePassword(values);
        if (error) {
          message.error(error.message);
          onCancel();
          return;
        }
  
        if (resData.code === 200) {
          message.success("修改成功");
          updateList(id);
          onCancel();
        } else {
          message.error(resData.message);
        }
      });
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const validator = (rule, value) => {
    if (value !== password) {
      return Promise.reject('两次输入密码不一致');
    }
    return Promise.resolve();
  };

  // 表单大体的布局
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 21 }
  };

  return (
    <Modal
      title='修改密码'
      width={650}
      open={visible}
      onOk={onFinish}
      onCancel={onCancel}
      afterClose={()=>form.resetFields()}>
      <Form form={form} preserve={false}>
        <Form.Item
          label='新密码'
          name='password'
          {...layout}
          rules={[{
            required: true,
            pattern: '^(?![a-zA-Z]+$)(?!\\d+$)(?![^\\da-zA-Z\\s]+$).{6,20}$',
            message: '密码强度不足，至少由数字、字母、特殊字符中两种至少6位组成'
          }]}>
          <Input type='password' placeholder='请输入新密码' style={{ height: 32 }} onBlur={getPassword} />
        </Form.Item>
      </Form>
      <Form form={form} preserve={false}>
        <Form.Item
          label='确认新密码'
          name='check'
          rules={[{ validator }]}
          validateTrigger='onBlur'
          {...layout}>
          <Input type='password' placeholder='请确认新密码' style={{ height: 32 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default React.forwardRef(PasswordModal);
