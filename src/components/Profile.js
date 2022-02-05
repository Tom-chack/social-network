import React from "react";
import { Tabs, Image, Typography } from "antd";
import {
  CoffeeOutlined,
  SolutionOutlined,
  TeamOutlined,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { TabPane } = Tabs;
const { Title } = Typography;

function Profile() {
  const Avatar = () => {
    return <Image width={200} src='./images/a2.jpg' alt='Sara' />;
  };

  return (
    <div className='profile'>
      <div className='profile-head' style={{ backgroundImage: "url(./images/3.jpg)" }}></div>
      <div className='profile-panel'>
        <div className='profile-panel-left'>
          <Avatar className='profile-avatar' alt='Sara' />
        </div>
        <div className='profile-panel-center'>
          <div>
            <Title level={3}>Sara Pike</Title>
            <div className='profile-joined'>Member since 2018</div>
          </div>
        </div>
        <div className='profile-panel-right'>
          <div className='profile-stat-box'>
            <span>posts</span>
            <span>18</span>
          </div>
          <div className='profile-stat-box'>
            <span>comments</span>
            <span>25</span>
          </div>
        </div>
      </div>
      <div className='profile-content'>
        <Tabs defaultActiveKey='2' size='large'>
          <TabPane
            tab={
              <span>
                <CoffeeOutlined />
                Activity
              </span>
            }
            key='1'
          >
            Activity Content
          </TabPane>

          <TabPane
            tab={
              <span>
                <SolutionOutlined />
                About
              </span>
            }
            key='2'
          >
            About Content
          </TabPane>

          <TabPane
            tab={
              <span>
                <TeamOutlined />
                Friends
              </span>
            }
            key='3'
          >
            Friends Content
          </TabPane>
          <TabPane
            tab={
              <span>
                <HeartOutlined />
                Favored
              </span>
            }
            key='4'
          >
            Favored Content
          </TabPane>
          <TabPane
            tab={
              <span>
                <SettingOutlined />
                Account Settings
              </span>
            }
            key='5'
          >
            Account Settings
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
