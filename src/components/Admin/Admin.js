import {
    UserOutlined,
    SnippetsOutlined
  } from '@ant-design/icons';
import {Layout, Menu } from 'antd';
import React, { useState } from 'react';
import AddPosts from './AddPosts';
import Posts from './Posts';
import Users from './Users';
  const { Header, Content, Footer, Sider } = Layout;
  
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
  const items = [
    // getItem('Đăng bài', '1', <SnippetsOutlined />),
    getItem('Đăng bài', '1', <SnippetsOutlined />, [
      getItem('Danh sách bài viết', '2'),
      getItem('Thêm bài viết mới', '3'),
    ]),
    getItem('Quản lý khách hàng', '4', <UserOutlined />),
  ];
  
  const Admin = () => {
    const CheckItem = ({ item, key, keyPath, selectedKeys}) => {
      console.log(key);
      setCheckKey(key);
    }
    const [checkKey, setCheckKey] = useState('2');
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['2']} mode="inline" items={items} onClick={CheckItem}/>
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: '0 16px',
            }}
          >
           {checkKey === '2' ? <Posts/> : checkKey === '3' ? <AddPosts/> : checkKey === '4' ? <Users/> : null}
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
  
  export default Admin;