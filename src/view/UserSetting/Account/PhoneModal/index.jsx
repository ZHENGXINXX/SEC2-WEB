import { Form, Input, Modal, message } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import State from '@/tools/state';
import { update } from '../../api';

function PhoneModal({updateList}, ref) {
  const [form] = Form.useForm();
  const [visible, setVis] = useState(false);
  const id = State.userInfo.id;

  useImperativeHandle(ref, () => ({ setVis }));

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      values.id = id;
      const [error,resData] = await  update(values);
      if(error){
        message.error(error.message);
        return;
      }
      if(resData.code === 200){
        message.success("更改电话成功");
        updateList(id);
      }else{
        message.error(resData.message);
      }
      onCancel();
    });
  };

  const onCancel = () => {
    setVis(false);
  };

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 }
  };

  return (
    <Modal
      forceRender
      title="电话"
      width={700}
      open={visible}
      afterClose={()=>form.resetFields()}
      onOk={onFinish}
      onCancel={onCancel}>
      <Form preserve={false} form={form} style={{padding:'50px 0'}}>
        <Form.Item
          label="电话号"
          name="phone"
          rules={[
            {
              required: true,
              pattern: '(^1[3|4|5|7|8]\\d{9}$)',
              message: '格式不正确'
            }
          ]}
          {...layout}>
          <Input placeholder='请输入电话号码' />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default React.forwardRef(PhoneModal);
