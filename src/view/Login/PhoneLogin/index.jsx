import { Button, Checkbox, Form, Input, Row, message } from 'antd';
import React, { useState } from 'react';
import css from './index.module.less';

export default function TeacherLogin() {
  const [captcha, setCaptcha] = useState();
  const onFinish = (values) => {
    if (values.captcha === captcha) {
      message.success(1);
    }
  };

  const getNumber = () => {
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
      <Form
        name='phone_login'
        className={css.form}
        onFinish={onFinish}>

        <Form.Item
          name='phone'
          rules={[
            {
              required: true,
              pattern: '^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\\d{8}$',
              message: '请输入手机号'
            }]}
          className={css.item}
        >
          <Input placeholder='请输输入手机号' style={{ height: 50 }} />
        </Form.Item>

        <Row justify='space-between' className={css.captcha}>
          <Form.Item
            name='captcha'
            rules={[{ required: true, message: '请输入验证码' }]}
            style={{ marginLeft: 25 }}>
            <Input placeholder='请输入验证码' style={{ width: 300, height: 50 }} />
          </Form.Item>

          <Form.Item>
            <Button type='primary' style={{ height: 50, marginRight: 25 }} onClick={getNumber}>发送验证码</Button>
          </Form.Item>
        </Row>

        <Row justify='space-between' className={css.autoLogin}>
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
