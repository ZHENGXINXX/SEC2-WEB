import { Button, Card, Table } from 'antd';
import React from 'react';
import State from '@/tools/state';
import { PlusOutlined } from '@ant-design/icons';
import css from './index.module.less';
import { studentColum, teacherColumn } from './colums';

export default function Members({ index, stuData, teaData }) {

  return (
    <Card className={css.members}>
      <div className={css.header}>
        <div className={css.title}>
          <div className={css.type}>{index ? "教师团队" : "全部学生"}</div>
          <div className={css.number}>共{ }人</div>
        </div>
        {State.isTeacher &&
          <div className={css.all}>
            <Button type='primary' style={{ lineHeight: 1 }}><PlusOutlined />添加助教</Button>
          </div>}
      </div>
      <Table dataSource={index ? teaData : stuData} columns={index ? teacherColumn : studentColum} rowKey='accountNumber'/>
    </Card>
  );
}
