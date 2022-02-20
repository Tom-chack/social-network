import React from "react";
import { Form, Input } from "antd";
import "./Account.css";
import TextArea from "antd/lib/input/TextArea";

function Account() {
  return (
    <>
      <h2>Profile Information</h2>
      <Form 
        className="ant-form" 
        method="post"
        >
        <div className="labels">Full Name</div>
        <Input placeholder="@ex. Name Surname" type="text" />
        <div className="labels">Profile photo</div>
        <Input className="button" style={{ marginBottom: "1%" }} type="file" />
        <div className="labels">Cover image</div>
        <Input className="button" type="file" style={{ marginBottom: "1%" }} />
        <div
          className="label"
          style={{ marginLeft: "3%", paddingBottom: "1%" }}
        >
          About Me
        </div>
        <TextArea placeholder="Short intro..." type="textarea" />
      </Form>
      <Form className="ant-form" method="post">
        <h2>Personal Information</h2>
        <div className="labels">Email</div>
        <Input placeholder="Enter you email" type="email" />
        <div className="labels">Password</div>
        <Input placeholder="Enter you password" type="password" />
      </Form>
      <Form className="ant-form" method="post">
        <h2>Social Networks</h2>
        <div className="labels">Facebook</div>
        <Input placeholder="Enter Facebook account link" type="text" />
        <div className="labels">Twitter</div>
        <Input placeholder="Enter Twitter account link" type="text" />
        <div className="labels">Linkdin</div>
        <Input placeholder="Enter Linkdin account link" type="text" />
        <div className="labels">Github</div>
        <Input placeholder="Enter Github account link" type="text" />
        <div className="labels">Viber</div>
        <Input placeholder="Enter Viber account link" type="text" />
        <div className="labels">Whatsapp</div>
        <Input placeholder="Enter Whatsapp account link" type="text" />
      </Form>
    </>
  );
}

export default Account;
