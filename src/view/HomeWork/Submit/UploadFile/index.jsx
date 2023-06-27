import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import css from './index.module.less';
import { Card, Form, Input, Upload } from 'antd';

const TextArea = Input.TextArea;
export default function UploadFile({ form }) {

  const beforeUpload = (info) => {
    form.setFieldValue('file', info);
    return false;
  };

  return (
    <Card className={css.card}>
      <Form form={form}>
        <div className={css.name}>作业附件</div>
        <Form.Item
          name='file'
          valuePropName="file">
          <Upload beforeUpload={beforeUpload} listType='picture'>
            <div className={css.content}>
              <div className={css.upload}>
                <UploadOutlined className={css.size} />
              </div>
              <div className={css.link}>点击上传添加文件</div>
              <div className={css.support}>支持各类文档、图片、代码、压缩包格式</div>
            </div>
          </Upload>
        </Form.Item>
        <div className={css.message}>作业留言
          <span>选填</span>
        </div>
        <Form.Item
          name='homeworkMessage'>
          <TextArea
            placeholder='请输入留言'
            showCount
            maxLength={255}
            autoSize={{ minRows: 5 }} />
        </Form.Item>
      </Form>
    </Card>

  );
}
