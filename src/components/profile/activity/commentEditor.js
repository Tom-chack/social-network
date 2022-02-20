import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../services/comment";

import { Form, Input, Button } from "antd";
import getBase64 from "../../helpers/file2base64";

import "./postEditor.css";

const { Text } = Input;

function PostEditor() {
  //Redux functions
  const dispatch = useDispatch();

  //Send submitted data to json-server
  const [form] = Form.useForm();
  const onSubmit = (data) => {
    dispatch(addComment({ ...data, image }));
    form.resetFields();
  };

  //Post Editor
  return (
    <div className='post-editor'>
      <Form form={form} name='comment-editor' onFinish={onSubmit} autoComplete='off'>
        <Form.Item
          name='content'
          className='comment-field-content'
          rules={[
            {
              required: true,
              message: "The comment content cannot be empty!",
            },
          ]}
        >
          <TextArea
            placeholder='Write comment here...'
            allowClear
            maxLength={100}
            style={{ height: 80,width:200 }}
            name='content'
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostEditor;
