import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../services/post";

import { Form, Input, Button } from "antd";
import getBase64 from "../../helpers/file2base64";

import "./postEditor.css";

const { TextArea } = Input;

function PostEditor() {
  //Redux functions
  const dispatch = useDispatch();

  //File attachments
  const [image, setImage] = useState("");
  const inputEl = useRef(null);

  const uploadFile = async () => {
    let file = inputEl.current.files[0];
    let data = await getBase64(file);
    setImage(data);
  };

  //Send submitted data to json-server
  const [form] = Form.useForm();
  const onSubmit = (data) => {
    dispatch(addPost({ ...data, image }));
    form.resetFields();
  };

  //Post Editor
  return (
    <div className='post-editor'>
      <Form form={form} name='post-editor' onFinish={onSubmit} autoComplete='off'>
        <Form.Item
          name='content'
          className='post-field-content'
          rules={[
            {
              required: true,
              message: "The post content cannot be empty!",
            },
          ]}
        >
          <TextArea
            placeholder='Post content here...'
            allowClear
            maxLength={100}
            style={{ height: 80 }}
            name='content'
          />
        </Form.Item>

        <Form.Item className='post-field-image'>
          <input type='file' ref={inputEl} name='image' onChange={uploadFile} />
          {image && <img src={image} alt='Preview' style={{ height: "34px" }} />}
          <div className='post-editor-sep'></div>
          <Button type='primary' htmlType='submit'>
            Submit Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostEditor;
