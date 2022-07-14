import {
    PlusSquareOutlined,
    SnippetsOutlined,
    CheckCircleOutlined
  } from '@ant-design/icons';
import {Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useAppContext } from '../Routers/Index';
import Test from './Test';
import Test1 from './Test1';
import Test2 from './Test2';
import Test3 from './Test3';
import Test4 from './Test4';
import Test5 from './Test5';
  const { Header, Content, Footer, Sider } = Layout;
  
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const SetOfQuestions = () => {
    const {user} = useAppContext()
    
    const items = [
        getItem('Kiểm tra chung', '1', <CheckCircleOutlined />),
    ];

    if(user[0].userName === "" || user[0].userName === null) {
        
    }else{
        items.push(
            (getItem('Bộ câu hỏi', '2', <PlusSquareOutlined />, [
                getItem('Thang Đánh Giá Lo Âu Zung', '3'),
                getItem('Thang đánh giá lòng tự trọng Rosenberg', '4'),
                getItem('Thang đánh giá Trầm cảm – Lo âu – Stress (DASS-21)', '5'),
                getItem('Thang đánh giá trầm cảm (PHQ-9)', '6'),
                getItem('Trắc nghiệm nhân cách của Eysenck', '7'),
            ]))
        )
    }

    const CheckItem = ({ item, key, keyPath, selectedKeys}) => {
      console.log(key);
      setCheckKey(key);
    }
    const [checkKey, setCheckKey] = useState('1');
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={CheckItem}/>
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: '0 16px',
            }}
          >
           {checkKey === '1' ? <Test/> : checkKey === '3' ? <Test1/> : checkKey === '4' ? <Test2/> : checkKey === '5' ? <Test3/> : checkKey === '6' ? <Test4/> : checkKey === '7' ? <Test5/> : null}
          </Content>
          {/* <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    );
  };
  
  export default SetOfQuestions;