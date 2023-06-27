import React, { useState } from 'react';
import css from './index.module.less';
import './index.less';
import { Button, Form, Input, Layout, Row, message } from 'antd';
import { regist } from './api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [isStu, setStu] = useState(false);
  const [captcha, setCaptcha] = useState();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const regex = new RegExp('(^1[3|4|5|7|8]\\d{9}$)');

  const onFinish = async (values) => {

    if (regex.test(values.account)) {
      values.phone = values.account;
    } else {
      values.mailbox = values.account;
    }

    if (isStu) {
      values.role = 2;
    } else {
      values.role = 1;
    }

    const [error, resData] = await regist(values);
    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      message.success("注册成功");
      navigate('/login');
    } else {
      message.error(resData.message);
    }
  };

  const change = (value) => {
    setStu(value);
  };

  const shown = (event) => {
    setPassword(event.target.value);
  };

  const checkPassword = (rule, value) => {
    if (value !== password) {
      return Promise.reject('两次输入密码不一致');
    }
    return Promise.resolve();
  };

  const checkCaptcha = (rule, value) => {
    if (value !== captcha) {
      return Promise.reject('验证码错误');
    }
    return Promise.resolve();
  };

  const getCaptcha = () => {
    const chars = ['A', 'B', 'C', 'D', 'a', 'b', 'c', 'd', '0', '1', '2', '3'];  //用数组chars保存验证码里出现的字符
    let randCode = "";   //定义一个初始值为空的字符串变量为最终产生的随机验证码
    for (var i = 0; i < 4; i++) {
      //0-1的随机小数 -->  0~数组长度-1的范围   取整
      let randPosition = Math.floor(Math.random() * (chars.length - 1));  //每次生成一个随机数的位置
      randCode += chars[randPosition];//带有随机位置作为下标，指示到当前随机产生的某个字符上，将其连接到随机验证码的后面
    }
    setCaptcha(randCode);
    message.success("当前验证码为: " + randCode);
  };

  return (
    <div>
      <Layout className={css.register}>
        <Layout.Content className={css.content}>
          <Form
            name='norm_login'
            className={css.form}
            onFinish={onFinish}>
            <div className={css.title}>注册账号</div>
            <Form.Item
              name='account'
              className={css.item}
              rules={[
                {
                  required: true,
                  pattern: '(^[\\w.\\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\\.)+[a-z]{2,3}$)|(^1[3|4|5|7|8]\\d{9}$)',
                  message: '格式不正确'
                }
              ]}>
              <Input placeholder='请输入邮箱/手机号' style={{ height: 50 }} />
            </Form.Item>

            <Form.Item
              name='password'
              className={css.item}
              rules={[{
                required: true,
                pattern: '^(?![a-zA-Z]+$)(?!\\d+$)(?![^\\da-zA-Z\\s]+$).{6,20}$',
                message: '密码强度不足，至少由数字、字母、特殊字符中两种至少6位组成'
              }]}>
              <Input type='password' placeholder='请输密码' onBlur={shown} style={{ height: 50 }} />
            </Form.Item>

            <Form.Item
              name='passwordAgain'
              className={css.item}
              rules={[{ validator: checkPassword }]}
              validateTrigger='onBlur'>
              <Input type='password' placeholder='请再次输入密码' style={{ height: 50 }} />
            </Form.Item>

            <div className={css.role}>选择身份</div>
            <Row justify='space-between' style={{ marginBottom: 25, marginLeft: 25, marginRight: 25 }}>
              <div className='div' style={{ border: isStu ? '' : '1px solid blue' }} onClick={() => change(false)}>
                <img src='https://www.ketangpai.com/img/teacher.b1111283.svg' />老师
              </div>

              <div className='div' style={{ border: isStu ? '1px solid blue' : '' }} onClick={() => change(true)}>
                <img src='https://www.ketangpai.com/img/student.0ba0711e.svg' />学生
              </div>
            </Row>

            <Form.Item
              name='name'
              className={css.item}
              rules={[{ required: true, message: '请输入姓名' }]}>
              <Input placeholder='请输入姓名' style={{ height: 50 }} />
            </Form.Item>

            <Form.Item
              name='school'
              className={css.item}
              rules={[{ required: true, message: '请输入学校/机构' }]}>
              <Input placeholder='请选择学校' style={{ height: 50 }} />
            </Form.Item>

            {
              isStu ? <Form.Item
                name='studentTeacherId'
                className={css.item}
                rules={[{ required: true, message: '请输入学号' }]}>
                <Input placeholder='请输入学号' style={{ height: 50 }} />
              </Form.Item> : <></>
            }

            <Row justify='space-between' style={{ height: 65 }}>
              <Form.Item
                name='captcha'
                rules={[{ validator: checkCaptcha }]}
                validateTrigger='onBlur'
                style={{ marginLeft: 25 }}>
                <Input placeholder='请输入验证码' style={{ width: 225, height: 50 }} />
              </Form.Item>
              <Form.Item
                style={{ marginRight: 25 }}>
                <Button type='primary' style={{ width: 185, height: 50 }} onClick={getCaptcha}>获取验证码</Button>
              </Form.Item>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size='large'
                className={css.button}>
                注册
              </Button>
            </Form.Item>

            <Row justify='space-between' style={{ height: 30, marginLeft: 25, marginRight: 25 }}>
              <Form.Item>
              </Form.Item>

              <Form.Item>
                <span>已有账号？<a href='/login'>去登录</a></span>
              </Form.Item>
            </Row>
          </Form>
        </Layout.Content>
      </Layout>
    </div>
  );
}
