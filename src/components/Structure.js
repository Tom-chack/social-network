import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

function Structure() {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/"><span>Home</span></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/members"><span>Members</span></Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/login"><span>Login</span></Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/register"><span>Register</span></Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Social Network by Group 3</Footer>
    </Layout>
  );
}

export default Structure;
