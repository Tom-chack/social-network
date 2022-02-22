import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Card } from "antd";
import getBase64 from "../../../helpers/file2base64";
import TextArea from "antd/lib/input/TextArea";
import getUsers from "../../../services/getUsers";
import { updateUser } from "../../../services/user";
import { Button } from "antd";

import "./Account.css";

function Account() {
  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");
  const [dataUpdated, setDataUpdated] = useState("");
  const [loading, setLoading] = useState(false);
  const { profile, user, users } = useSelector((state) => state.userDuck);
  const avatarRef = useRef(null);
  const coverRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  //filtering current user data
  const currentUser = users.filter((item) => item.id === user.id);

  //sending updated data to json server.
  const updateAccount = (data) => {
    setDataUpdated("Updating...");
    setLoading(true);

    setTimeout(() => {
      setDataUpdated("Profile has been updated successfully!");
      setLoading(false);
    }, 2000);

    setTimeout(() => {
      setDataUpdated("");
    }, 4000);

    if (avatar) data.avatar = avatar;
    if (cover) data.cover = cover;
    dispatch(updateUser({ ...data, id: profile.id }));
  };

  const uploadAvatar = async () => {
    let avatarData = avatarRef.current.files[0];
    let avatar = await getBase64(avatarData);
    setAvatar(avatar);
  };

  const uploadCover = async () => {
    let coverData = avatarRef.current.files[0];
    let cover = await getBase64(coverData);
    setCover(cover);
  };

  return (
    <div>
      {user.id === profile.id
        ? currentUser.map((item) => {
            return (
              <Form
                key={item.id}
                layout='vertical'
                onFinish={updateAccount}
                className='ant-form'
                initialValues={{
                  name: item.name ? item.name : "",
                  about: item.about ? item.about : "",
                  email: item.email ? item.email : "",
                  password: item.password ? item.password : "",
                  fb: item.fb ? item.fb : "",
                  tw: item.tw ? item.tw : "",
                  lin: item.lin ? item.lin : "",
                  git: item.git ? item.git : "",
                  vib: item.vib ? item.vib : "",
                  wapp: item.wapp ? item.wapp : "",
                }}
              >
                <h2>Profile Information</h2>
                <Card style={{ backgroundColor: "#fafafa" }}>
                  <Form.Item
                    label='Full Name'
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: "Please input your name and surname!",
                      },
                    ]}
                  >
                    <Input name='name' placeholder='@ex. Name Surname' />
                  </Form.Item>
                  <Form.Item label='Profile Photo'>
                    <input
                      name='avatar'
                      placeholder='Choose you profile picture'
                      type='file'
                      ref={avatarRef}
                      onChange={uploadAvatar}
                    />
                  </Form.Item>
                  <Form.Item label='Cover image'>
                    <input
                      name='cover'
                      placeholder='Choose you cover image'
                      type='file'
                      ref={coverRef}
                      onChange={uploadCover}
                    />
                  </Form.Item>
                  <Form.Item label='About Me' name='about'>
                    <TextArea placeholder='Short intro...' />
                  </Form.Item>
                </Card>

                <h2 style={{ marginTop: "20px" }}>Personal Information</h2>
                <Card style={{ backgroundColor: "#fafafa" }}>
                  <Form.Item
                    label='Email'
                    name='email'
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
                    <Input placeholder='Enter you email' />
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
                    <Input placeholder='Enter you password' type='password' />
                  </Form.Item>
                </Card>

                <h2 style={{ marginTop: "20px" }}>Social Networks</h2>
                <Card style={{ backgroundColor: "#fafafa" }}>
                  <Form.Item label='Facebook' name='fb'>
                    <Input placeholder='Enter Facebook account link' />
                  </Form.Item>
                  <Form.Item label='Twitter' name='tw'>
                    <Input placeholder='Enter Twitter account link' />
                  </Form.Item>
                  <Form.Item label='Linkdin' name='lin'>
                    <Input placeholder='Enter Linkdin account link' />
                  </Form.Item>
                  <Form.Item label='Github' name='git'>
                    <Input placeholder='Enter Github account link' />
                  </Form.Item>
                  <Form.Item label='Viber' name='vib'>
                    <Input placeholder='Enter Viber account link' />
                  </Form.Item>
                  <Form.Item label='Wahtsapp' name='wapp'>
                    <Input placeholder='Enter Whatsapp account link' />
                  </Form.Item>
                </Card>

                <div
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    fontSize: "16px",
                    color: "#005500",
                  }}
                >
                  {dataUpdated}
                </div>

                <div style={{ textAlign: "center", padding: "20px" }}>
                  <Button
                    loading={loading}
                    htmlType='submit'
                    type='primary'
                    className='button-update'
                    size='large'
                  >
                    Update Profile
                  </Button>
                </div>
              </Form>
            );
          })
        : ""}
    </div>
  );
}

export default Account;
