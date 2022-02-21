import React from "react";
import { Image } from "antd";

import "./comment.css";
import { CommentOutlined, SettingOutlined } from "@ant-design/icons";

import timeAgo from "../../helpers/timeAgo";

function Comment({ comment }) {
  const { user } = comment;
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
        <div className='comment-left'>
          <CommentOutlined /> <span className='comment-likes'>Reply</span>
        </div>
        <div className='comment-right'>
          <SettingOutlined />
        </div>
      </div>
    </div>
  );
}

export default Comment;
