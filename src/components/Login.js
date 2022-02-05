import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegistered } from "../redux/ducks/userDuck";
import login from "../services/login";

import { Form, Input, Button, Checkbox, Row, Col, Divider, Typography } from "antd";
const { Title } = Typography;

function Login() {
  //Using navigate to redirect to home page after successfuly login
  const navigate = useNavigate();

  //Local state to handle login result messages
  const [formMessage, setFormMessage] = useState("");

  //Redux functions
  const dispatch = useDispatch();
  const { user, loggedIn, errorsUser } = useSelector((state) => state.userDuck);

  //Authorize username/password in asynchronous login() function
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  //Handle login form submission, if login successes, shows success message and redirects, otherwise shows error message from redux errorsUser
  useEffect(() => {
    if (loggedIn) {
      setFormMessage("Login Succeed...");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } else {
      setFormMessage(errorsUser);
    }
  }, [user, navigate, loggedIn, errorsUser]);

  useEffect(() => {
    dispatch(userRegistered());
  }, [dispatch]);

  //Create login form based on Ant Design { Form, Input, Button, Checkbox }
  return (
    <div className='login-page'>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Title level={3} align='center'>
            Login
          </Title>

          <Divider plain>{formMessage}</Divider>

          <Form
            name='login'
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
              name='remember'
              valuePropName='checked'
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type='primary' htmlType='submit'>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
}

export default Login;
