import React from "react";
import { Image } from "antd";

import "./post.css";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

function Post({ post }) {
  const { user } = post;
  const { image } = post;
  return (
    <div className='post'>
      <div className='post-head'>
        <div className='post-user'>
          <Image width={48} src={user.avatar} alt={user.name || user.username} />
          <div className='post-user-info'>{user.name || user.username}</div>
        </div>
        <div className='post-date'>{timeAgo.format(post.date)}</div>
      </div>
      <div className='post-body'>
        <div className='post-content'>{post.content}</div>
        <div className='post-image'>
          {image && <Image width={"100%"} src={image} alt='post image' />}
        </div>
      </div>
      <div className='post-foot'>
        <div className='post-left'>
          <HeartOutlined className='post-like-icon' />
          <span className='post-likes'>Likes</span>
          <span className='post-likes-count'>{post.likes}</span>
        </div>
        <div className='post-right'>
          <MessageOutlined className='post-comment-icon' />
          <span className='post-comments'>comments</span>
          <span className='post-comments-count'>{post.comments.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
