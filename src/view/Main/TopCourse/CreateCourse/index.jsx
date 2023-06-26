import { Form, Input, InputNumber, Modal, Radio, Row, Select, message } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import { CaretUpOutlined } from '@ant-design/icons';
import { semester, years } from '@/components/Items';
import css from './index.module.less';
import State from '@/tools/state';
import { create } from '../api';

function CreateCourse({getAll}, ref) {
  const [form] = Form.useForm();
  const [visible, setVis] = useState();
  const [more, setMore] = useState(false);
  useImperativeHandle(ref, () => ({ setVis }));

  const onCancel = () => {
    setVis(false);
  };

  const onFinish = () => {
    form.validateFields().then( async (values) => {
      values.teacherId = State.userInfo.id;
      const [error,resData] = await create(values);
      if(error){
        message.error(error.message);
        onCancel();
        return;
      }

      if(resData.code === 200){
        message.success("添加课程成功");
        getAll(State.userInfo.id);
        onCancel();
      }
    });
  };

  const rules = [{ required: true, message: '不能为空' }];

  return (
    <Modal
      forceRender
      title='加入课程'
      width={800}
      open={visible}
      afterClose={()=>form.resetFields()}
      onCancel={onCancel}
      onOk={onFinish}>
      <Form form={form} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} style={{ padding: "20px 0" }}>
        <Form.Item
          label='课程名称'
          name='name'
          rules={rules}>
          <Input
            placeholder='请输入课程名称'
            showCount
            maxLength={50}
            autosize={{ maxRows: 1 }} />
        </Form.Item>

        <Form.Item
          label='教学班级'
          name='clazz'
          rules={rules}>
          <Input
            placeholder='请输入教学班级'
            showCount
            maxLength={30}
            autosize={{ maxRows: 1 }} />
        </Form.Item>

        <Row justify="space-between">
          <Form.Item
            label='请选择学年'
            name='schoolYear'
            labelCol={{ span: 7 }}
            rules={rules}>
            <Select placeholder='请选择学年' options={years} style={{ width: 240 }} />
          </Form.Item>

          <Form.Item
            label='请选择学期'
            name='semester'
            labelCol={{ span: 7 }}
            rules={rules}>
            <Select placeholder='请选择学期' options={semester} style={{ width: 240 }} />
          </Form.Item>
        </Row>
        <div className={css.show} onClick={() => setMore(!more)}>
          <span className={css.name}>更多信息</span>
          <CaretUpOutlined rotate={more ? 180 : 0} className={css.img} />
        </div>
        {more && <div className={css.more}>
          <Row justify='space-between'>
            <Form.Item
              label='授课模式'
              name='teachingMode'
              labelCol={{ span: 6 }}>
              <Radio.Group style={{ width: 320 }}>
                <Radio value="线上">线下</Radio>
                <Radio value="线下">线上</Radio>
                <Radio value="混合">混合</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="学时"
              name='classHour'
              labelCol={{ span: 3 }}
            >
              <InputNumber placeholder='请输入学时' style={{ width: 240 }} />
            </Form.Item>
          </Row>

          <Form.Item
            label='课程介绍'
            name='courseIntroduction'>
            <Input.TextArea
              placeholder='请输入课程介绍'
              maxLength={255}
              showCount
              autosize={{ minRows: 3 }} />
          </Form.Item>

          <Form.Item
            label='授课地点'
            name='place'>
            <Input placeholder='请输入授课地点' />
          </Form.Item>
        </div>
        }
      </Form>
    </Modal >
  );
}
export default React.forwardRef(CreateCourse);