import {Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios'
import TestLoading from '../Loading/TestLoading';
import { useNavigate } from 'react-router-dom';
import "./Form_login.css"
import { useAppContext } from '../Routers/Index';
import swal from 'sweetalert';

const data = []

const qa = [{
  question:{
    "code": "",
    "content": ""
  },
  answer:{
    "code": "",
    "content": "",
    "point": 0
  }
}]

const Form_login = () => {
  const navigate = useNavigate()
  const {questionAnswer, setQuestionAnswer, user, soq, setSoq, setRes} = useAppContext()
  const {setUser} = useAppContext()
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
    if(userInput.userName === null || userInput.userName === "" || userInput.password === null || userInput.password === ""){
      swal({
        title: "Không bỏ trống thông tin",
        icon: "warning",
        dangerMode: true,
      });
    }else postApi();
  }
  const checkUser = (d) => {
    if(d !== null && d.length !== 0){
      if(questionAnswer[0].question.code === null || questionAnswer[0].question.code ==='') navigate("/home")
      else{
        navigate("/result")
      }
    }
    else 
        swal({
          title: "Sai tên đăng nhập hoặc mật khẩu",
          icon: "warning",
          dangerMode: true,
        });
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
      if(res.data !== null && res.data.length !== 0) setUser(res.data)
      checkUser(res.data)
      if(questionAnswer[0].question.code === null || questionAnswer[0].question.code ===''){
        
      }else{
        if(res.data.length !==0 || res.data !== null) postApiUQA(res.data)
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
      // console.log(dataSource);
    })
  }

  const current = new Date();
  const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;

  const postApiCPT = (d) => {
    // setLoading(true)
    let p = 0;
    for(let i=0; i<questionAnswer.length; i++){
      p = p + questionAnswer[i].answer.point;
      // console.log(i);
      // console.log(questionAnswer);
      // console.log(p);
    }
    console.log(p);
    console.log(soq);
    axios({
      method: 'post',
      url: "https://funlife.azurewebsites.net/checkPsychologicalTower",
      data: {
        "pointMin" : p,
        "pointMax" : p,
        "codeSetOfQuestions" : soq
      },
    }).then((res) => {
      setDataSource(res.data)
      setRes(res.data)
      postApiUPT(d, res.data)
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      // setLoading(false)
      setQuestionAnswer([])
      setSoq("")
    })
  }

  const postApiUPT = (d, dt) => {
    axios({
      method: 'post',
      url: "https://funlife.azurewebsites.net/addUserPsychologicalTower",
      data: {
        "userName" : d[0].userName,
        "codePsychologicalTower" : dt[0].code,
        "date":date
      },
    }).then((res) => {
      setDataSource(res.data)
      // console.log(res.data);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      questionAnswer.length = 0
    })
  }

  const postApiUQA = (d) => {
    setLoading(true)
    // console.log(questionAnswer);
    for(let i=0; i<questionAnswer.length; i++){
      data.push({"userName":d[0].userName, "codeQuestion":questionAnswer[i].question.code, "codeAnswer":questionAnswer[i].answer.code, "date":date})
      console.log(d[0].userName);
      console.log(questionAnswer[i].question.code);
      console.log(questionAnswer[i].answer.code);
    }
    // console.log(data);
    axios({
      method: 'post',
      url: "https://funlife.azurewebsites.net/addUserQuestionAnswers",
      data: data,
    }).then((res) => {
      console.log(res.data);
      postApiCPT(d)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      data.length = 0;
      setLoading(false)
    })
  }


  return (
    <div className="App">
      <header className="App-header">

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
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading = {loading}
                onClick={() => {
                    checkLogin();
                }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
    </header>
    </div>
  );
};

export default Form_login;