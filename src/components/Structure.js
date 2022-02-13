import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Menus from "./Menus";
const { Header, Content, Footer } = Layout;

function Structure() {
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        <Menus />
      </Header>

      <Content style={{ padding: "0 50px", margin: "0 auto" }}>
        <div className='site-layout-content'>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Social Network by Group 3</Footer>
    </Layout>
  );
}

export default Structure;
