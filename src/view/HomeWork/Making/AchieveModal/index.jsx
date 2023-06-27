import { Form, InputNumber, Modal, message } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import { correct } from '../../api';

function AchieveModal({ getData, totalScore }, ref) {
  const [form] = Form.useForm();
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

  return (
    <Modal
      title='打分'
      width={500}
      open={open.visible}
      onOk={onFinish}
      onCancel={onCancel}
      afterClose={() => form.resetFields()}>
      <Form form={form} style={{ padding: '30px 0' }}>
        <Form.Item
          name='achievement'
          label='成绩'>
          <InputNumber placeholder='请输入该学生成绩' style={{ width: 400 }} max={totalScore} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default React.forwardRef(AchieveModal);