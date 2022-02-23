import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addPost, updatePost } from "../../services/post";

import { Form, Input, Button } from "antd";
import getBase64 from "../../helpers/file2base64";

import "./postEditor.css";

const { TextArea } = Input;

function PostEditor({ post = {}, editorId = "post-editor", cancel = null }) {
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
    if (post?.id) {
      if (image) {
        dispatch(updatePost({ ...post, ...data, image }));
      } else {
        dispatch(updatePost({ ...post, ...data }));
      }
      if (cancel !== null) cancel();
    } else {
      dispatch(addPost({ ...data, image }));
      form.resetFields();
    }
    setImage(null);
  };

  //Post Editor
  return (
    <div className='post-editor'>
      <Form form={form} name={editorId} onFinish={onSubmit} autoComplete='off'>
        <Form.Item
          name='content'
          className='post-field-content'
          initialValue={post?.content}
          rules={[
            {
              required: true,
              message: "The post content cannot be empty!",
            },
          ]}
        >
          <TextArea placeholder='Post content here...' allowClear style={{ height: 80 }} />
        </Form.Item>
        <Form.Item className='post-field-image'>
          <input type='file' ref={inputEl} name='image' onChange={uploadFile} />
          {image && <img src={image} alt='Preview' style={{ height: "34px" }} />}
          <div className='post-editor-sep'></div>
          {cancel === null || (
            <Button onClick={() => cancel()} className='cancel-button'>
              Cancel
            </Button>
          )}
          <Button type='primary' htmlType='submit'>
            {post.id ? "Update Post" : "Submit Post"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostEditor;
