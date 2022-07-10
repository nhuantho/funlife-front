import { Alert, Spin } from 'antd';
import React from 'react';
import "./Loading.css"

const TestLoading = () => (
  <div className='App'>
    <header className="App-header">
    <Spin tip="Hệ thống đang tải, xin vui lòng chờ trong ít phút...">
    
  </Spin>
  </header>
  </div>
  
);

export default TestLoading;