import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getUsers from "../../services/getUsers";
import getUser from "../../services/getUser";
import { Form, Input } from "antd";
import "./Account.css";
import TextArea from "antd/lib/input/TextArea";

function Account() {

  const { users } = useSelector((state) => state.userDuck);
  const { user } = useSelector((state) => state.userDuck);

  const dispatch = useDispatch();
  //getting users and current user
  useEffect (() => {
    dispatch(getUsers());
    dispatch(getUser())
  }, [dispatch])
  
  const handleSubmit = (data) => {
    console.log(data);
  };

  console.log(user);
  console.log(users)

  return (
    <>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="ant-form"
        method="post"
      >
        <h2>Profile Information</h2>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="@ex. Name Surname" />
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
      </Form>
    </>
  );
}

export default Account;
