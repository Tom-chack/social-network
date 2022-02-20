import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../services/comment";
import getBase64 from "../../../helpers/file2base64";

import { Form, Input, Button } from "antd";
const { TextArea } = Input;
function CommentEditor() {
    const [image, setImage] = useState("");
    const inputEl = useRef(null);
  
    const uploadFile = async () => {
      let file = inputEl.current.files[0];
      let data = await getBase64(file);
      setImage(data);
    };
  const dispatch = useDispatch();

  //Send submitted data to json-server
  const [form] = Form.useForm();
  const onSubmit = (data) => {
    console.log(data)
    dispatch(addComment(data));
    form.resetFields();
  };

  return (
    <div className='comment-editor'>
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
            style={{ height: 30 ,width:400}}
            name='content'
            onChange={uploadFile}
          />
          </Form.Item>
          <Form.Item>
          {image && <img src={image} alt='Preview' style={{ height: "34px" }} />}
          <div></div>
           <Button type='primary' htmlType='submit'>
            Reply comment
          </Button>
       </Form.Item>
      </Form>
    </div>
  );
}

export default CommentEditor;
