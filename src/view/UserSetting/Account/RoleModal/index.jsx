import { Form, Modal, Radio, message } from 'antd';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { update } from '../../api';
import State from '@/tools/state';

function RoleModal({ updateList }, ref) {
  const [form] = Form.useForm();
  const [visible, setVis] = useState({ visible: false, role: 0 });
  const id = State.userInfo.id;

  useImperativeHandle(ref, () => ({ setVis }));

  const onCancel = () => {
    setVis({ visible: false, role: 0 });
  };

  const onFinish = () => {
    form.validateFields()
      .then(async (values) => {
        values.id = id;
        const [error, resData] = await update(values);
        if (error) {
          message.error(error.message);
          onCancel();
          return;
        }

        if (resData.code === 200) {
          message.success("修改成功");
          State.setUserRole(values.role);
          updateList(id);
          onCancel();
          setTimeout(function () {
            window.location.reload();
          }, 100);
        } else {
          message.error(resData.message);
        }
      });
  };

  useEffect(() => {
    if (visible.role > 0) {
      form.setFieldValue('role', visible.role);
    }
  }, [visible.role]);

  return (
    <Modal
      title='所属角色'
      width={650}
      open={visible.visible}
      onOk={onFinish}
      onCancel={onCancel}
      destroyOnClose
      maskClosable={false}
      closable={false}>
      <Form form={form} preserve={false}>
        <Form.Item
          label='选择角色'
          name='role'
          labelCol={{ span: 8 }}>
          <Radio.Group>
            <Radio value={1}>老师</Radio>
            <Radio value={2}>学生</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default React.forwardRef(RoleModal);
