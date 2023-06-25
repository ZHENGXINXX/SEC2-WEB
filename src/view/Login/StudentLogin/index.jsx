import React from 'react';
import { Button, Checkbox, Form, Input, Row, message } from 'antd';
import { login } from '../api';
import State from '@/tools/state';
import { useNavigate } from 'react-router-dom';
import css from './index.module.less';
import './index.less';


export default function StudentLogin() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const [error, resData] = await login(values);
    if(error){
      message.error(error.message);
      return;
    }

    if(resData.code === 200){
      message.success('登录成功');
      navigate('/main');
      State.login(resData.data);
    }
  };

  return (
    <div>
      <Form
        name='normal_login'
        className={css.form}
        onFinish={onFinish}>

        <Form.Item
          name='username'
          rules={[{ required: true, message: '请输入邮箱/手机号/账号' }]}
          className={css.item}
        >
          <Input placeholder='请输如邮箱/手机号/账号' style={{height:50}}/>
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
          className={css.item} >
          <Input.Password placeholder='请输入密码' style={{height:50}}/>
        </Form.Item>

        <Row justify='space-between' style={{ height: 30, lineHeight: 30, marginLeft: 25, marginRight: 25 }}>
          <Form.Item style={{ height: 30 }}>
            <Checkbox><span>下次自动登录</span></Checkbox>
          </Form.Item>

          <Form.Item style={{ height: 30 }}>
            <span>忘记密码</span>
          </Form.Item>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size='large'
            className={css.button}>
            登录
          </Button>
        </Form.Item>

        <Row justify='space-between' style={{ height: 30, lineHeight: 30, marginLeft: 25, marginRight: 25 }}>
          <Form.Item>
          </Form.Item>

          <Form.Item>
            <span>还没有账号？<a href='/register'>去注册</a></span>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
}
