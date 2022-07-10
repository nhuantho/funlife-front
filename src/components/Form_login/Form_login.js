import {Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'
import TestLoading from '../Loading/TestLoading';
import { useNavigate } from 'react-router-dom';

const Form_login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  //--------------------------------------------

  const [userInput, setInput] = useState({
    userName: '',
    password: '',
  })

  //---------------------------------
  // lây dữ liệu khi nhập vào ô input
  const userNameChange = (event) => {
    const userName = event.target.value;
    if(userName !== '' ||  userName!= null) {
        setInput({
            ...userInput,
            userName: userName, // set value
        })
    }
  }

  // lây dữ liệu khi nhập vào ô input
  const PasswordChange = (event) => {
    const password = event.target.value;
    if(password !== '' ||  password!= null) {
        setInput({
            ...userInput,
            password: password, // set value
        })
    }
  }

  const checkLogin = () => {
    if((userInput.userName !== null || userInput.userName !== '') || (userInput.password !== null || userInput.password !== ''))
    postApi();
  }
  const checkUser = (data) => {
    if(data !== null && data.length !== 0)
        return navigate("/")
    else 
        return alert("loi")
  }
  //-----------------------------

  //-----------------------------

  const postApi = () => {
    setLoading(true) // xoay
    axios({
      method: 'post',
      url: "https://funlife.azurewebsites.net/checkUser",
      data: {
        "userName" : userInput.userName,
        "password" : userInput.password
      },
    }).then((res) => {
      setDataSource(res.data)
      checkUser(res.data)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
      console.log(dataSource);
    })
  }


  return (
    <>
    {loading === true ? <TestLoading/> : null}
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="Tài khoản"
        name="username"
        rules={[
          {
            required: true,
            message: 'Không bỏ trống!',
          },
        ]}
      >
        <Input onChange={userNameChange}/>
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Không bỏ trống!',
          },
        ]}
      >
        <Input.Password  onChange={PasswordChange}/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit"
            onClick={() => {
                checkLogin();
            }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default Form_login;