import React, { useState, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Image, Popover, Button } from "antd";

import "./comment.css";
import { CommentOutlined, SettingOutlined } from "@ant-design/icons";

import timeAgo from "../../helpers/timeAgo";
import CommentEditor from "../Editor/commentEditor";
import { deleteComment } from "../../services/comment";

function Comment({ post, comment }) {
  const { user } = comment;
  const [reply, setReply] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const { user: currentUser, loggedIn } = useSelector((state) => state.userDuck);

  const handleCancel = useCallback(() => {
    setReply(false);
    setEdit(false);
  }, []);

  const tools = () => {
    return (
      <div>
        <Button type='primary' size='small' ghost onClick={() => setEdit(true)}>
          Edit
        </Button>
        <Button
          danger
          size='small'
          onClick={() =>
            window.confirm("Are you sure you want to delete this post?") &&
            dispatch(deleteComment(comment))
          }
        >
          Delete
        </Button>
      </div>
    );
  };

  const ToolsButton = () => {
    if (loggedIn && user.id === currentUser.id) {
      return (
        <Popover content={tools} className='tools'>
          <SettingOutlined />
        </Popover>
      );
    }
    return "";
  };

  return (
    <div className='comment'>
      <div className='comment-head'>
        <div className='comment-user'>
          {user?.avatar && <Image width={30} src={user.avatar} alt={user.name || user.username} />}
          <div className='comment-user-info'>{user.name || user.username}</div>
        </div>
        <div className='comment-date'> / {timeAgo.format(comment.date)}</div>
      </div>
      <div className='comment-body'>
        <div className='comment-content'>{comment.content}</div>
      </div>
      <div className='comment-foot'>
        <div className='comment-left' onClick={() => loggedIn && setReply(!reply)}>
          {loggedIn && (
            <>
              <CommentOutlined /> <span className='comment-likes'>Reply</span>
            </>
          )}
        </div>
        <div className='comment-right'>
          <ToolsButton />
        </div>
      </div>
      {edit && (
        <div className='comment-editor'>
          <CommentEditor
            editorId={`comment-editor-${post.id}`}
            post={post}
            comment={comment}
            cancel={handleCancel}
          />
        </div>
      )}
      {reply && (
        <div className='comment-editor'>
          <CommentEditor editorId={`comment-editor-${post.id}`} post={post} cancel={handleCancel} />
        </div>
      )}
    </div>
  );
}

export default Comment;
