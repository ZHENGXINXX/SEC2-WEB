import { Form, Input, Modal, message } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import State from '@/tools/state';
import { add } from '../api';

function AddCourse({getAll}, ref) {
  const [form] = Form.useForm();
  const [visible, setVis] = useState();
  useImperativeHandle(ref, () => ({ setVis }));

  const onCancel = () => {
    setVis(false);
  };

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      values.studentId = State.userInfo.id;
      const [error,resData] = await add(values);

      if(error){
        message.error(error.message);
        onCancel();
        return;
      }

      if(resData.code === 200){
        message.success("加入课程成功");
        getAll(State.userInfo.id);
        onCancel();
      }
    });
  };

  return (
    <Modal
      forceRender
      title='加入课程'
      width={800}
      open={visible}
      onCancel={onCancel}
      onOk={onFinish}>
      <Form form={form} preserve={false}style={{padding:"20px 0"}}>
        <Form.Item
          label='加课码'
          name='courseCode'
          required>
          <Input placeholder='请输入加课码' />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default React.forwardRef(AddCourse);