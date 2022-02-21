import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Image } from "antd";

import "./comment.css";
import { CommentOutlined, SettingOutlined } from "@ant-design/icons";

import timeAgo from "../../helpers/timeAgo";
import CommentEditor from "../Editor/commentEditor";

function Comment({ post, comment }) {
  const { user } = comment;
  const [reply, setReply] = useState(false);
  const { loggedIn } = useSelector((state) => state.userDuck);

  const handleCancel = useCallback(() => {
    setReply(false);
  }, []);

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
          <CommentOutlined /> <span className='comment-likes'>Reply</span>
        </div>
        <div className='comment-right'>
          <SettingOutlined />
        </div>
      </div>
      {reply && (
        <div className='comment-editor'>
          <CommentEditor editorId={`comment-editor-${post.id}`} post={post} cancel={handleCancel} />
        </div>
      )}
    </div>
  );
}

export default Comment;
