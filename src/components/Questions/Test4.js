import React, { useEffect, useState } from 'react';
import axios from 'axios'
import TestLoading from '../Loading/TestLoading';
import "./Test.css"
import CheckTest from './CheckTest';
import { useAppContext } from '../Routers/Index';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

const data = {
    "code": "",
    "name": "",
    "questions": [
        {
            "code": "",
            "content": "",
            "questionAnswers": [
                {
                    "id": 0,
                    "answer": {
                        "code": "",
                        "content": "Vui vẻ, thoải mái, không có cảm giác khó chịu",
                        "point": 0
                    },
                    "checkTest": ""
                },
            ]
        },
    ]
}

const test = []

const Test4 = () => {
  const navigate = useNavigate()
  const {questionAnswer, setQuestionAnswer, user, setSoq, setRes} = useAppContext()

  const [loading, setLoading] = useState(false)

  const [dataSource, setDataSource] = useState(data)

  const AddQA = (d) => {
    console.log(d);
    test.push(d)
    console.log(test.length);
    console.log(dataSource.questions.length);
    console.log(questionAnswer);
  }

  const CheckUser = () => {
    if(user[0].userName === null || user[0].userName === '') return navigate("/resgiter")
    else{
      postApiUQA()
      return navigate("/result")
    }
  }

  const Onclick = (data) => {
    // console.log(data);
    setQuestionAnswer([])
    setQuestionAnswer(test)
    console.log(questionAnswer);
    setSoq(dataSource.code)
    test.slice(0, test.length)
    return CheckUser();
  }

  console.log(test);

  const API = "https://funlife.azurewebsites.net/getByCodeSetOfQuestions/DGTCP"

  useEffect(()=> (
    getApi()
  ),[])

  const getApi = () => {
    setLoading(true)
    axios({
      method: 'get',
      url: API,
      data: null,
    }).then((res) => {
      setDataSource(res.data)
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
    })
  }
  //--------------------------------------------------------
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

    axios({
      method: 'post',
      url: "https://funlife.azurewebsites.net/checkPsychologicalTower",
      data: {
        "pointMin" : p,
        "pointMax" : p,
        "codeSetOfQuestions" : dataSource.code
      },
    }).then((res) => {
      setDataSource(res.data)
      setRes(res.data)
      postApiUPT(res.data)
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      // setLoading(false)
      setQuestionAnswer([])
    })
  }

  const postApiUPT = (dt) => {
    axios({
      method: 'post',
      url: "https://funlife.azurewebsites.net/addUserPsychologicalTower",
      data: {
        "userName" : user[0].userName,
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

  const postApiUQA = () => {
    setLoading(true)
    // console.log(questionAnswer);
    const data = []
    for(let i=0; i<test.length; i++){
      data.push({"userName":user[0].userName, "codeQuestion":test[i].question.code, "codeAnswer":test[i].answer.code, "date":date})
    }
    // console.log(data);
    axios({
      method: 'post',
      url: "https://funlife.azurewebsites.net/addUserQuestionAnswers",
      data: data,
    }).then((res) => {
      console.log(res.data);
      postApiCPT()
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
      data.slice(0, data.length)
    })
  }

  return (
    <div style={{marginLeft: 30, marginTop: 30}}>
    {loading === true ? <TestLoading/>:null}
    <Form>
    <p style={{color: "red"}}>*Lưu ý chỉ chọn đáp án 1 lần và chọn đủ đáp án để có kết quả chính xác!</p>
    {
      dataSource.questions.map((question, index) => {
        return(
          <CheckTest question={question} index={index} AddQA={AddQA}/>
        );
      })
    }
    <Form.Item
    wrapperCol={{
        offset: 8,
        span: 16,
    }}
    style={{marginTop: 30}}
    >
    <Button onClick={() => Onclick(test)} type="primary" loading={loading}>Xem kết quả</Button>
    
    </Form.Item>
    </Form>
    </div>
  );
};

export default Test4;