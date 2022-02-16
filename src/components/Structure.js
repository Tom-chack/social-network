import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Menus from "./Menus";
const { Header, Content, Footer } = Layout;

function Structure() {
  // const { user } = useSelector((state) => state.userDuck);
  
  return (
    <Layout className='layout'>
      <Header>
        <div className='headLeft'>
          <span className='xLogo'>
            <span style={{ color: "#b5dbf2" }}>REACT</span> / FUNS
          </span>
        </div>
        <div className='headRight'>
          <Menus />
        </div>
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
