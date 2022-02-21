import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getUsers from "../services/getUsers";
import register from "../services/register";
import "./Register.css";

import { Form, Input, Button, Row, Col, Divider, Typography } from "antd";
const { Title } = Typography;

function Register() {
  //Using navigate to redirect to home page after successfully login
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local state to handle login result messages
  const [formMessage, setFormMessage] = useState("");
  const [userExists, setUserExists] = useState(false);
  const { users } = useSelector((state) => state.userDuck);

  //getting all users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  //making array consists of only usernames
  const usernames = users.map((item) => item.username);
  console.log(usernames);

  //Redux functions
  let { errorsUser } = useSelector((state) => state.userDuck);

  //Authorize username/password in asynchronous login() function, checking if username exists or no
  const onSubmit = (data) => {
    console.log(data);
    if (usernames.includes(data.username)) {
      setUserExists(true);
    } else {
      setUserExists(false);
      setFormMessage("completed");
      dispatch(register(data));
    }
  };

  //Handle registration form submission, if registration successes, shows success message and redirects, otherwise shows error message from redux errorsUser
  useEffect(() => {
    if (userExists) {
      setFormMessage("Username already exists!");
    } else if (!userExists && formMessage !== "") {
      setFormMessage("You have successfully registered...");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } else {
      setFormMessage(errorsUser);
    }
  }, [navigate, errorsUser, userExists, formMessage]);

  //Create register form based on Ant Design { Form, Input, Button, Checkbox }
  return (
    <div className='register-page'>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Title level={3} align='center'>
            Registration
          </Title>

          <Divider plain>{formMessage}</Divider>

          <Form
            name='register'
            labelCol={{ span: 8 }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onSubmit}
            autoComplete='off'
          >
            <Form.Item
              label='Username'
              name='username'
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input className={userExists ? "repeated-username" : ""} />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type='primary' htmlType='submit'>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
}

export default Register;
