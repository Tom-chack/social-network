import React from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../services/comment";
import { Form, Input, Button } from "antd";
const { TextArea } = Input;
function CommentEditor({ id }) {
  const dispatch = useDispatch();

  //Send submitted data to json-server
  const [form] = Form.useForm();
  const onSubmit = (data) => {
    dispatch(addComment({ ...data, postid: id }));
    form.resetFields();
  };

  return (
    <div className='comment-editor'>
      <Form
        form={form}
        name='comment-editor'
        onFinish={onSubmit}
        autoComplete='off'
        style={{ display: "flex", marginTop: "15px" }}
      >
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
            style={{ height: 40, width: "calc(100% - 10px)", marginLeft: 10 }}
            name='content'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            style={{ height: 40, width: 100, marginLeft: 2 }}
          >
            Reply
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CommentEditor;
