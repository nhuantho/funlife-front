import React from 'react'
import 'antd/dist/antd.css';
import "./Form_regist.css"
import { useState } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Select, Spin } from 'antd';

export default function Form_regist() {
  
  return (
    <div className="App">
      <header className="App-header">
        <a href='https://ant.design/components/form'>Document</a>
        <Form
          labelCol={{span: 10}} // căn lề
          wrapperCol={{span: 15}}
          onFinish = {
            value => {
              console.log(value)
              alert('Success ^^!')
            }
          }
          onFinishFailed = {
            err => {
              console.log(err);
            }
          }
        >
          <Form.Item
            name="name"
            label="Full Name:"
            hasFeedback
            rules={[
              {required : true, message: 'Please enter your name'},
              {whitespace: true },
              {min: 3},
            ]}
          >
            <Input placeholder='Enter your name'></Input>
          </Form.Item>
        
          <Form.Item
            name="email"
            label="Email:"
            hasFeedback
            rules={[
              {required : true, message: 'Please enter your email'},
              {type: 'email', message: 'Email is unvaild'}
            ]}
          >
            <Input placeholder='Enter your email'></Input>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            hasFeedback
            rules={[
              {required : true, message: 'Please enter your password'},
              { min: 6 },
              {
                // validator : (rules,value) => {
                //   value && value.includes('huy')
                //   ? Promise.resolve()
                //   : Promise.reject("Password must have 'huy' ")
                // }
              }
            ]}
          >
            <Input.Password placeholder='Enter your password'></Input.Password>
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            hasFeedback
            dependencies={['password']} // phụ thuộc
            rules={[
              {required : true, message: 'Please enter your password'},
              { min: 6 },
              ({getFieldValue}) => ({
                validator(rules,value) {
                  if (!value || value === getFieldValue('password'))
                    return Promise.resolve()
                  return Promise.reject('the confirm password is not match with the password. ')
                }
              }),
            ]}
          >
            <Input.Password placeholder='Enter your confirm password'></Input.Password>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            hasFeedback
            rules={[
              {required: true, message:'Please select your gender'}
            ]}
          >
            <Select placeholder='Select your gender'>
              <Select.Option value='male' >Male</Select.Option>
              <Select.Option value='female' >Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of birth"
            hasFeedback
            rules={[
              {required: true, message:'Please choose your date of birth'}
            ]}
          >
            <DatePicker style={{width: "100%"}}/>
          </Form.Item>

          <Form.Item
            name="fb"
            label="Link Facebook"
            hasFeedback
            rules={[
              {required: true, message:'Please enter your link facebook'},
              {type: 'url', message:'Your link facebook is unvalid'}
            ]}
          >
            <Input placeholder='Enter your link facebook'></Input>
          </Form.Item>

          <Form.Item
            name ='agree'
            lable=""
            valuePropName = "checked"
            rules={[
              {
                validator(_,value) {
                  if (value )
                    return Promise.resolve()
                  return Promise.reject("You need to agree before submit")
                }
              },

            ]}
          >
            <Checkbox>Agree with<a href='https://www.facebook.com/huykoyomi'> Huy Koyomi</a></Checkbox>
          </Form.Item>

          <Form.Item
            name ='agree'
            lable=""
          >
            <Button type="primary" htmlType='submit'>Regist</Button>
          </Form.Item>

        </Form>
      </header>
    </div>
  )
}

