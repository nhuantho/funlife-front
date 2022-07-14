import React from 'react'
import 'antd/dist/antd.css';
import "./Form_regist.css"
import { useState } from 'react'
import { Button, Checkbox, DatePicker, Form, Input, Select, Spin } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Form_regist() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userInput, setInput] = useState({
    userName: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    phoneNumber: '',
    job: '',
    university: '',
    password: '',
    isAdmin: 0
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

  const fullNameChange = (event) => {
    const fullName = event.target.value;
    if(fullName !== '' ||  fullName!= null) {
        setInput({
            ...userInput,
            fullName: fullName, // set value
        })
    }
  }

  const dateOfBirthChange = (value, dateString) => {
    const dateOfBirth = dateString;
    if(dateOfBirth !== '' ||  dateOfBirth!= null) {
        setInput({
            ...userInput,
            dateOfBirth: dateOfBirth, // set value
        })
    }
  }

  const genderChange = (value) => {
    const gender = value;
    if(gender !== '' ||  gender!= null) {
        setInput({
            ...userInput,
            gender: gender, // set value
        })
    }
  }

  const addressChange = (event) => {
    const address = event.target.value;
    if(address !== '' ||  address!= null) {
        setInput({
            ...userInput,
            address: address, // set value
        })
    }
  }

  const phoneNumberChange = (event) => {
    const phoneNumber = event.target.value;
    if(phoneNumber !== '' ||  phoneNumber!= null) {
        setInput({
            ...userInput,
            phoneNumber: phoneNumber, // set value
        })
    }
  }

  const jobChange = (value) => {
    const job = value;
    if(job !== '' ||  job!= null) {
        setInput({
            ...userInput,
            job: job, // set value
        })
    }
  }

  const CheckRegist = (data) => {
    if(data !== null && data.length !== 0)
        return navigate("/login")
    else 
        return alert("loi")
  }

  const Check = () => {
    if(userInput.userName === '' || userInput.fullName === '' || userInput.dateOfBirth === '' || userInput.gender === '' || userInput.address === '' || userInput.phoneNumber === '' || userInput.job === '' || userInput.password === ''){
      swal({
        title: "Không bỏ trống các thông tin",
        icon: "warning",
        dangerMode: true,
      });
    }else{
      postApiCU();
    }
  }

  const postApi = () => {
    setLoading(true) // xoay
    axios({
      method: 'post',
      url: "https://funlife.azurewebsites.net/addUsers",
      data: [{
        "userName": userInput.userName,
        "fullName": userInput.fullName,
        "dateOfBirth": userInput.dateOfBirth,
        "gender": userInput.gender,
        "address": userInput.address,
        "phoneNumber": userInput.phoneNumber,
        "job": userInput.job,
        "university": "",
        "password": userInput.password,
        "isAdmin": 0,
      }]
    }).then((res) => {
      CheckRegist(res.data)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
    })
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

  console.log(userInput);

  const postApiCU = () => {
    setLoading(true) // xoay
    axios({
      method: 'get',
      url: "http://localhost:8888/getByUserName/" + userInput.userName,
      data: null
    }).then((res) => {
      if(res.data === null) postApi()
      else swal({
        title: "Đã tồn tại tài khoản",
        icon: "warning",
        dangerMode: true,
      });
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
      // console.log(dataSource);
    })
  }

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
            rules={[
              {required : true, message: 'Vui lòng nhập tên của bạn'},
              {whitespace: true },
              {min: 6, message: "Tên phải lớn hơn 6 kí tự"},
            ]}
          >
            <Input placeholder='Nhập họ tên' onChange={fullNameChange}></Input>
          </Form.Item>

          <Form.Item
            name="dob"
            label="Ngày sinh"
            hasFeedback
            rules={[
              {required: true, message:'Vui lòng chọn ngày sinh'}
            ]}
          >
            <DatePicker 
              style={{width: "100%"}}
              onChange={dateOfBirthChange}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            hasFeedback
            rules={[
              {required: true, message:'Vui lòng chọn giới tính'}
            ]}
          >
            <Select placeholder='Chọn giới tính' onChange={genderChange}>
              <Select.Option value='Nam' >Nam</Select.Option>
              <Select.Option value='Nữ' >Nữ</Select.Option>
            </Select>
          </Form.Item>
        
          <Form.Item
            name="address"
            label="Địa chỉ"
            hasFeedback
            rules={[
              {required : true, message: 'Vui lòng nhập địa chỉ'}
            ]}
          >
            <Input placeholder='Nhập địa chỉ' onChange={addressChange}></Input>
          </Form.Item>

          <Form.Item
            name="phonenumber"
            label="Số điện thoại"
            hasFeedback
            rules={[
              {required : true, message: 'Vui lòng nhập số điện thoại'},
              // {type: 'phone', message: 'Email is unvaild'}
            ]}
          >
            <Input placeholder='Số điện thoại' onChange={phoneNumberChange}></Input>
          </Form.Item>

          <Form.Item
            name="job"
            label="Công việc"
            hasFeedback
            rules={[
              {required: true, message:'Vui lòng chọn công việc'}
            ]}
          >
            <Select placeholder='Chọn công việc' onChange={jobChange}>
              <Select.Option value='Sinh viên' >Sinh viên</Select.Option>
              <Select.Option value='Học sinh' >Học sinh</Select.Option>
              <Select.Option value='Đã đi làm' >Đã đi làm</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="username"
            label="Tài khoản"
            hasFeedback
            rules={[
              {required : true, message: 'Vui lòng nhập tài khoản'},
              { min: 8, message: "Nhập lớn hơn 8 kí tự" },
              {
                // validator : (rules,value) => {
                //   value && value.includes('huy')
                //   ? Promise.resolve()
                //   : Promise.reject("Password must have 'huy' ")
                // }
              }
            ]}
          >
            <Input placeholder='Tài khoản' onChange={userNameChange}></Input>
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            hasFeedback
            rules={[
              {required : true, message: 'Vui lòng nhập mật khẩu'},
              { min: 8, message: "Nhập lớn hơn 8 kí tự" },
              {
                // validator : (rules,value) => {
                //   value && value.includes('huy')
                //   ? Promise.resolve()
                //   : Promise.reject("Password must have 'huy' ")
                // }
              }
            ]}
          >
            <Input.Password placeholder='Mật khẩu' onChange={PasswordChange}></Input.Password>
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu"
            hasFeedback
            dependencies={['password']} // phụ thuộc
            rules={[
              {required : true, message: 'Vui lòng nhập lại mật khẩu'},
              { min: 8, message: "Mật khẩu phải lớn hơn 8 kí tự" },
              ({getFieldValue}) => ({
                validator(rules,value) {
                  if (!value || value === getFieldValue('password'))
                    return Promise.resolve()
                  return Promise.reject('Hai mật khẩu không trùng nhau')
                }
              }),
            ]}
          >
            <Input.Password placeholder='Nhập lại mẩu khẩu'></Input.Password>
          </Form.Item>

          {/* <Form.Item
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
          </Form.Item> */}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType='submit' loading={loading} onClick={Check}>Đăng ký</Button>
          </Form.Item>

        </Form>
        <button style={{height: 32, fontSize: 15, color: "#1890ff", borderColor: "#fff", backgroundColor: "#fff", marginLeft: 115}} onClick={() => navigate("/login")}>Đăng nhập</button>
      </header>
    </div>
  )
}

