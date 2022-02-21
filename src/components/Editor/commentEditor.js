import { useDispatch } from "react-redux";
import { addComment, updateComment } from "../../services/comment";

import { Form, Input, Button } from "antd";

import "./commentEditor.css";

const { TextArea } = Input;

function PostEditor({ post = {}, comment = {}, editorId = "comment-editor", cancel = null }) {
  //Redux functions
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onSubmit = (data) => {
    if (comment?.id) {
      dispatch(updateComment({ ...comment, ...data, postid: post?.id }));
    } else {
      dispatch(addComment({ ...data, date: Date.now(), postid: post?.id }));
      form.resetFields();
    }
    if (cancel !== null) cancel();
  };

  //Post Editor
  return (
    <div className='comment-editor'>
      <Form form={form} name={editorId} onFinish={onSubmit} autoComplete='off'>
        <Form.Item
          name='content'
          className='comment-field-content'
          initialValue={comment?.content}
          rules={[
            {
              required: true,
              message: "The comment content cannot be empty!",
            },
          ]}
        >
          <TextArea placeholder='Comment text here...' allowClear style={{ height: 60 }} />
        </Form.Item>
        <Form.Item className='comment-field-image'>
          <div className='comment-editor-sep'></div>
          {cancel === null || (
            <Button onClick={() => cancel()} className='cancel-button'>
              Cancel
            </Button>
          )}
          <Button type='primary' htmlType='submit'>
            {comment.id ? "Update Post" : "Submit Post"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostEditor;
