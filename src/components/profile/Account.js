import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import "./Account.css";
import TextArea from "antd/lib/input/TextArea";
import getUsers from "../../services/getUsers";

function Account() {
  const { profile } = useSelector((state) => state.userDuck);
  const { users } = useSelector((state) => state.userDuck);
  const { user } = useSelector((state) => state.userDuck)
  const { loggedIn } = useSelector((state) => state.userDuck);
  console.log (loggedIn)
  console.log(user)
  console.log(users)

  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(getUsers());
  },  [dispatch])

  //filtering current user data
  const currentUser = users.map (item => {
    if (item.id === user.id){
      return item
    }
  }).filter (item => item !== undefined);
  console.log(currentUser)
  const updateAccount= (data) => {
    console.log(data);
    
  };

  return (
    <div>
    {user.id === profile.id ? currentUser.map ((item) => {
      console.log(item)
      return (<Form
        key={item.id}
        layout="vertical"
        onFinish={updateAccount}
        className="ant-form"
        method="post"
        initialValues={{
          name: item.name ? item.name : "",
          avatar: item.avatar ? item.avatar : "",
          cover: item.cover ? item.cover : "",
          about: item.about ? item.about : "",
          email: item.email ? item.email : "",
          password: item.password ? item.password : "",
          fb: item.fb ? item.fb : "",
          tw: item.tw ? item.tw : "",
          lin: item.lin ? item.lin : "",
          git: item.git ? item.git : "",
          vib: item.vib ? item.vib : "",
          wapp: item.wapp ? item.wapp : "",
        }
          
        }
      >
        <h2>Profile Information</h2>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name and surname!",
            },
          ]}
        >
          <Input name="name" placeholder="@ex. Name Surname" />
        </Form.Item>
        <Form.Item label="Profile Photo" name="avatar">
          <Input placeholder="Choose you profile picture" type="file" />
        </Form.Item>
        <Form.Item label="Cover image" name="cover">
          <Input placeholder="Choose you cover image" type="file" />
        </Form.Item>
        <Form.Item label="About Me" name="about">
          <TextArea placeholder="Short intro..." />
        </Form.Item>

        <h2>Personal Information</h2>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input placeholder="Enter you email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input placeholder="Enter you password" type="password" />
        </Form.Item>

        <h2>Social Networks</h2>
        <Form.Item
          label="Facebook"
          name="fb"
          rules={[
            {
              required: true,
              message: "Please input your facebook account!",
            },
          ]}
        >
          <Input placeholder="Enter Facebook account link" />
        </Form.Item>
        <Form.Item
          label="Twitter"
          name="tw"
          rules={[
            {
              required: true,
              message: "Please input your twitter account!",
            },
          ]}
        >
          <Input placeholder="Enter Twitter account link" />
        </Form.Item>
        <Form.Item
          label="Linkdin"
          name="lin"
          rules={[
            {
              required: true,
              message: "Please input your linkdin account!",
            },
          ]}
        >
          <Input placeholder="Enter Linkdin account link" />
        </Form.Item>
        <Form.Item label="Github" name="git">
          <Input placeholder="Enter Github account link" />
        </Form.Item>
        <Form.Item label="Viber" name="vib">
          <Input placeholder="Enter Viber account link" />
        </Form.Item>
        <Form.Item label="Wahtsapp" name="wapp">
          <Input placeholder="Enter Whatsapp account link" />
        </Form.Item>
        <Form.Item>
        <Input
          type="submit"
          value="Update"
          className="button-update"
        />
        </Form.Item>
      </Form>)
    }) : ""}
    </div>
  );
}

export default Account;