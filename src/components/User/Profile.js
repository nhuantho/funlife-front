import React from 'react'
import 'antd/dist/antd.css';
import "./Profile.css"
import { Button, Checkbox, DatePicker, Form, Input, Select, Spin } from 'antd';
import { useAppContext } from '../Routers/Index';

export default function Profile() {
  const {user} = useAppContext()
  return (
    <div className="App">
      <header className="App-header">
        <Form
          labelCol={{span: 10}} // căn lề
          wrapperCol={{span: 15}}
        >
          <Form.Item
            name="name"
            label="Họ tên"
            hasFeedback
          >
            <Input defaultValue={user[0].fullName}></Input>
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Ngày sinh"
            hasFeedback
          >
            <Input defaultValue={user[0].dateOfBirth}></Input>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            hasFeedback
          >
            <Input defaultValue={user[0].gender}></Input>
          </Form.Item>
        
          <Form.Item
            name="address"
            label="Địa chỉ"
            hasFeedback
          >
            <Input defaultValue={user[0].address}></Input>
          </Form.Item>

          <Form.Item
            name="phonenumber"
            label="Số điện thoại"
            hasFeedback
          >
            <Input defaultValue={user[0].phoneNumber}></Input>
          </Form.Item>

          <Form.Item
            name="job"
            label="Công việc"
            hasFeedback
          >
            <Input defaultValue={user[0].job}></Input>
          </Form.Item>

          <Form.Item
            name="username"
            label="Tài khoản"
            hasFeedback
          >
            <Input defaultValue={user[0].userName}></Input>
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            hasFeedback
          >
            <Input.Password defaultValue={user[0].password}></Input.Password>
          </Form.Item>

        </Form>
      </header>
    </div>
  )
}

