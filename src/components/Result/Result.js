import { Button, Result } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestLoading from '../Loading/TestLoading';
import { useAppContext } from '../Routers/Index';
import { SmileOutlined } from '@ant-design/icons';
import { useTimeout } from 'usehooks-ts'
import Logo from '../../Icon/Logo';

const data = []

const Res = () => {
  const navigate = useNavigate()
  const {setQuestionAnswer} = useAppContext()
  const {res} = useAppContext()
  const [loading, setLoading] = useState(false)
  
  return (
  <>
  {loading === true ? <TestLoading/>:null}
  <div>
    <Result
      icon={<Logo/>}
      title={res[0].diseaseLevel === "" || res[0].diseaseLevel === null ? "Hãy trả lời để nhận kết quả": res[0].diseaseLevel}
      subTitle={res[0].advice}
      extra={[
        <Button onClick={() => (navigate("/"), setQuestionAnswer([]))} type="primary" key="console">
          Quay về trang chủ
        </Button>,
        <Button key="buy" onClick={() => (navigate("/test"), setQuestionAnswer([]))}>Tiếp tục kiểm tra tâm lý</Button>,
      ]}
    />
  </div>
  </>)
};

export default Res;