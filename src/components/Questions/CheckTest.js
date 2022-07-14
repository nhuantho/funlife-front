import { Radio, Space } from 'antd';
import React, { useState } from 'react';
import "./Test.css"

// const v = {
//   question:{
//     "code": "",
//     "content": ""
//   },
//   answer:{
//     "code": "",
//     "content": "",
//     "point": 0
//   }}
const v = {"code": "", "content": "", "point": 0}
const CheckTest = ({question, index, AddQA}) => {
  const [value, setValue] = useState(v);
  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
    AddQA({"question" :{"code":question.code, "content": question.content} , "answer": e.target.value})
  };

  return (
    <div style={{marginTop: 20}}>
    <p>Câu hỏi {index + 1} : {question.content}</p>
    <Radio.Group disabled={value.code === "" ? false : true} onChange={onChange} value={value}>
    <Space direction="vertical">
        {question.questionAnswers.map((questionAnswer) => {
            return(
                // <Radio value={{"question" :{"code":question.code, "content": question.content} , "answer": questionAnswer.answer}}>{questionAnswer.answer.content}</Radio>
                <Radio value={questionAnswer.answer}>{questionAnswer.answer.content}</Radio>
            );
        })}
        
    </Space>
    </Radio.Group>
    </div>
  );
};

export default CheckTest;