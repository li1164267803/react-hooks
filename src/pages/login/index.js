
import "./login.scss"
import API from '../../req'
import React, {useState}from 'react';
import {Button, InputItem, Toast} from 'antd-mobile';

const api = new API()
export default function Login(props) {
  const [phone, setAc] = useState("");
  const [password, setPw] = useState("");

  const phChange = phone => setAc(phone);
  const pwChange = password => setPw(password);
  const login = async () => {
    let phoneTrim = phone.replace(/\s/g, ''), reg = /^1[3456789]\d{9}$/;
    if (phoneTrim.length < 11 || !reg.test(phoneTrim)) return Toast.info('手机号格式不正确')
    if (!password) return Toast.info('密码不能为空');
    const res = await api.login({phone: phoneTrim, password})
    localStorage.token = res.token;
    props.history.push('/query')
  }
  return (
    <div className="login">
      <div className="title">
          <img src={require('../../image/login-icon.png')} alt=""/>
          <div>业务员登录入口</div>
      </div>
      <InputItem type="phone" className="phone" value={phone} onChange={phChange} placeholder="请输入手机号码"/>
      <InputItem type="password" className="password" value={password} onChange={pwChange} placeholder="请输入密码"/>
      <Button onClick={login}>登录</Button>
    </div>
  );
}