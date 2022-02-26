// React
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

//Redux
import { useDispatch, useSelector } from "react-redux";
import getProfile from "../services/getProfile";
import { addFriend, removeFriend } from "../services/user";

//Components
import Activity from "./profile/Activity/Activity";
import About from "./profile/About/About";
import Account from "./profile/Account/Account";
import Favored from "./profile/Favored/Favored";
import Friends from "./profile/Friends/Friends";

//Ant Design
import { Tabs, Image, Typography, Button } from "antd";
import {
  CoffeeOutlined,
  SolutionOutlined,
  TeamOutlined,
  HeartOutlined,
  SettingOutlined,
  UserAddOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Title } = Typography;

function Profile() {
  const [friendIcon, setFriendIcon] = useState(<UserAddOutlined />);
  const [friendButton, setFriendButton] = useState("button");

  //Using navigate to redirect to home page after successfully login
  const navigate = useNavigate();

  //Get current profile user id
  const { id } = useParams();

  //Redux functions, get current profile owner (user object)
  const dispatch = useDispatch();
  const { profile, loggedIn, user } = useSelector((state) => state.userDuck);

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

  //Add / Remove current profile user as friend
  const handleFriend = () => {
    setFriendIcon(<LoadingOutlined />);
    dispatch(addFriend(profile));
    setTimeout(() => {
      setFriendIcon(<CheckCircleOutlined />);
      setFriendButton("status");
    }, 1000);
  };

  const handleUnFriend = () => {
    setFriendIcon(<LoadingOutlined />);
    dispatch(removeFriend(profile));
    setTimeout(() => {
      setFriendIcon(<UserAddOutlined />);
      setFriendButton("button");
    }, 1000);
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
            <div className='profile-joined'>Member since {dateFormat(profile.date, "yyyy")}</div>
          </div>
          {loggedIn && profile.id !== user.id && (
            <div>
              {profile.friends.includes(user.id) || friendButton === "status" ? (
                <Button
                  type='primary'
                  ghost
                  shape='round'
                  icon={friendIcon}
                  className='profile-add-friend'
                  onClick={() => handleUnFriend()}
                  title='Click to unfriend this user'
                >
                  My Friend
                </Button>
              ) : (
                <Button
                  type='primary'
                  shape='round'
                  icon={friendIcon}
                  className='profile-add-friend'
                  onClick={() => handleFriend()}
                >
                  Add Friend
                </Button>
              )}
            </div>
          )}
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

          {loggedIn && user.id === profile.id && (
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
          )}
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
