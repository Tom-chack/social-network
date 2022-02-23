// React
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import getProfile from "../services/getProfile";

//Components
import Activity from "./profile/Activity";
import About from "./profile/About/About";
import Account from "./profile/Account/Account";
import Favored from "./profile/Favored/Favored";
import Friends from "./profile/Friends/Friends";

//Ant Design
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
  //Using navigate to redirect to home page after successfully login
  const navigate = useNavigate();

  //Get current profile user id
  const { id } = useParams();

  //Redux functions, get current profile owner (user object)
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userDuck);

  //Fetch user object by profile user id
  useEffect(() => {
    if (id) {
      dispatch(getProfile(id));
    } else {
      navigate("/", { replace: true });
    }
  }, [id, dispatch, navigate]);

  //Create user avatar component
  const Avatar = () => {
    return <Image width={200} src={profile.avatar} alt={profile.name || profile.username} />;
  };

  

  return (
    <div className='profile'>
      <div className='profile-head' style={{ backgroundImage: `url(${profile.cover})` }}></div>
      <div className='profile-panel'>
        <div className='profile-panel-left'>
          <Avatar className='profile-avatar' />
        </div>
        <div className='profile-panel-center'>
          <div>
            <Title level={3}>{profile.name || profile.username}</Title>
            <div className='profile-joined'>Member since 2018</div>
          </div>
        </div>
        <div className='profile-panel-right'>
          <div className='profile-stat-box'>
            <span>posts</span>
            <span>{profile.posts}</span>
          </div>
          <div className='profile-stat-box'>
            <span>comments</span>
            <span>{profile.comments}</span>
          </div>
        </div>
      </div>
      <div className='profile-content'>
        <Tabs defaultActiveKey='1' size='large'>
          <TabPane
            tab={
              <span>
                <CoffeeOutlined />
                Activity
              </span>
            }
            key='1'
          >
            <Activity />
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
            <About />
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
            <Friends />
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
              <Favored /> 

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
            <Account />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
