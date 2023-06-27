import { Form, Input, Modal, Radio, Upload, message } from 'antd';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { detail, edit } from '../api';
import css from './index.module.less';

const TextArea = Input.TextArea;
function EditModal({ getWork }, ref) {
  const [form] = Form.useForm();
  const [visible, setVis] = useState({ open: false, courseId: 0, taskId: 0 });
  useImperativeHandle(ref, () => ({ setVis }));

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 }
  };

  const onCancel = () => {
    setVis({ open: false, courseId: 0, taskId: 0 });
  };

  const beforeUpload = (file) => {
    form.setFieldValue('file', file);
    return false;
  };

  const getDetail = async (id) => {
    const [error, resData] = await detail(id);
    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      form.setFieldsValue(resData.data);
    } else {
      message.error(resData.message);
    }
  };

  useEffect(() => {
    if (visible.courseId && visible.taskId) {
      getDetail(visible.taskId);
    }
  }, [visible.courseId, visible.taskId]);

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      values.id = visible.taskId;
      if(values.file){
        values.jobAttachments = values.file.file;
      }
      const [error,resData] = await edit(values);
      if(error){
        message.error(error.message);
        onCancel();
        return;
      }

      if(resData.code === 200){
        message.success("编辑成功");
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
      title='编辑作业'
      width={780}
      open={visible.open}
      onOk={onFinish}
      afterClose={() => form.resetFields()}
      onCancel={onCancel}>
      <Form form={form} {...layout}>
        <Form.Item
          label='作业类型'
          name='type'
          rules={rules}
        >
          <Radio.Group>
            <Radio value={1}>个人作业</Radio>
            <Radio value={2}>小组作业</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label='作业标题'
          name='title'
          rules={rules}
          style={{ fontWeight: 'bold' }}
        >
          <Input placeholder='作业标题' showCount maxLength={70} />
        </Form.Item>

        <Form.Item
          name='jobDescription'
          wrapperCol={{ span: 24 }}
        >
          <TextArea
            showCount
            maxLength={255}
            autoSize={{ minRows: 8 }} />
        </Form.Item>

        <Form.Item
          name='file'
          valuePropName="file">
          <Upload beforeUpload={beforeUpload} listType='picture'>
            <div className={css.content}>
              <div className={css.upload}>
                <UploadOutlined className={css.size} />
              </div>
              <div className={css.link}>点击更新附件</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default React.forwardRef(EditModal);