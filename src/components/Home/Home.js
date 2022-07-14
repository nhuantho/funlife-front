import {
  CheckCircleOutlined,
  ReadOutlined,
  PicCenterOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import {Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useAppContext } from '../Routers/Index';
import Posts from './Posts/Posts';
import Psychologist from './Psychologist/Psychologist';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Home = () => {
  
  const items = [
      getItem('Bài viết chia sẻ', '1', <ReadOutlined />),
      getItem('Chuyên gia tâm lý', '2', <SolutionOutlined />),
      getItem('Trung tâm liên kết', '3', <PicCenterOutlined />),
  ];

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
          {checkKey === '1' ? <Posts/> : checkKey === '2' ? <Psychologist/> : checkKey === '3' ? <Psychologist/> : null}
         {/* {checkKey === '1' ? <Test/> : checkKey === '3' ? <Test1/> : checkKey === '4' ? <Test2/> : checkKey === '5' ? <Test3/> : checkKey === '6' ? <Test4/> : checkKey === '7' ? <Test5/> : null} */}
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

export default Home;