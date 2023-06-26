import { Button, DatePicker, Form, Input, InputNumber, Modal, Radio, Row, Upload, message } from 'antd';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { addFalse, addTrue } from '../api';
import { getCourse } from '../../../api';

const TextArea = Input.TextArea;
function AddModal({ getWork }, ref) {
  const [form] = Form.useForm();
  const [sta, setSta] = useState(0);
  const [number, setNum] = useState(0);
  const [visible, setVis] = useState({ open: false, courseId: 0 });
  useImperativeHandle(ref, () => ({ setVis }));

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 }
  };

  const onCancel = () => {
    setVis({ open: false, courseId: 0 });
  };

  const beforeUpload = (file) => {
    form.setFieldValue('file', file);
    return false;
  };

  const getJoinNumber = async (id) => {
    const [error, resData] = await getCourse(id);
    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      setNum(resData.data.joinNumber);
    } else {
      message.error(resData.message);
    }
  };

  useEffect(() => {
    if (visible.courseId)
      getJoinNumber(visible.courseId);
  }, [visible.courseId]);

  const onFinish = () => {
    form.validateFields().then(async (values) => {
      values.courseId = visible.courseId;
      values.jobAttachments = values.file.file;
      let res;
      if (values.state === 1) {
        values.startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss');
        values.endTime = values.endTime.format('YYYY-MM-DD HH:mm:ss');
        if (number > 0)
          res = await addTrue(values);
        else
          message.warning("该课程无学生，不能发布课程");
      } else {
        res = await addFalse(values);
      }

      if (res[0]) {
        message.error(res[0].message);
        onCancel();
        return;
      }

      if (res[1].code === 200) {
        message.success('添加成功');
        getWork(visible.courseId);
      } else {
        message.error('添加失败');
      }
      onCancel();
    });
  };

  const rules = [{ required: true, message: '不能为空' }];

  return (
    <Modal
      forceRender
      title='添加作业'
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
          label='上传文件'
          name='file'
          rules={rules}
          valuePropName="file">
          <Upload beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label='是否立即发布'
          name='state'
          rules={rules}
          labelCol={{ span: 4 }}
        >
          <Radio.Group onChange={(e) => setSta(e.target.value)} style={{ width: 200 }}>
            <Radio value={2}>不发布</Radio>
            <Radio value={1}>发布</Radio>
          </Radio.Group>
        </Form.Item>

        {sta === 1 ? <div>
          <Row justify='space-between'>
            <Form.Item
              label="发布时间"
              name='startTime'
              rules={rules}
              labelCol={{ span: 7 }}>
              <DatePicker placeholder='请选择开始时间' style={{ width: 200 }} showTime />
            </Form.Item>

            <Form.Item
              label="截止时间"
              name='endTime'
              rules={rules}
              labelCol={{ span: 7 }}>
              <DatePicker placeholder='请选择截止时间' style={{ width: 200 }} showTime />
            </Form.Item>
          </Row>
          <Row justify='space-between'>
            <Form.Item
              label='总分'
              name='totalCount'
              rules={rules}
              labelCol={{ span: 8 }}>
              <InputNumber placeholder='请输入作业总分' style={{ width: 200 }} />
            </Form.Item>
          </Row>
        </div> : <div></div>}
      </Form>
    </Modal>
  );
}
export default React.forwardRef(AddModal);