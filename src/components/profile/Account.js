import React from "react";
import { Button, Form, Input } from "antd";
import "./Account.css";
import TextArea from "antd/lib/input/TextArea";

function Account() {
  return (
    <Form className="ant-form" method="post">
      <h2>Profile Information</h2>
      <div className="labels">Full Name</div>
      <Input  placeholder="@ex. Name Surname" type="text" />
      <div className="labels">Profile photo</div>
      <Input
        placeholder="Choose profile pic"
        type="text"
      />
      <Button style={{marginBottom: "1%"}}>Choose file</Button>
      <div className="labels">Cover image</div>
      <Input
        placeholder="Choose cover image"
        type="text"
      />
      <Button style={{marginBottom: "1%"}}>Choose file</Button>
      <div className="label" style={{marginLeft: "3%", paddingBottom: "1%"}}>
        About Me
      </div>
      <TextArea  placeholder="Short intro..." type="textarea" />
    </Form>
  );
}

export default Account;
