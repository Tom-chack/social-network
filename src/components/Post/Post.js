import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, dislikePost } from "../../services/like";
import { Image } from "antd";

import "./post.css";
import { HeartOutlined, HeartTwoTone, MessageOutlined } from "@ant-design/icons";
import Comment from "../Comment/Comment";

import timeAgo from "../../helpers/timeAgo";

function Post({ post }) {
  const { user, liked, image, comments } = post;

  const dispatch = useDispatch();
  const { user: currentUser, loggedIn } = useSelector((state) => state.userDuck);

  const handleLike = (e) => {
    dispatch(likePost(post));
    e.target.style.fill = "#ff0000";
  };
  const handleDislike = (e) => {
    dispatch(dislikePost(post));
    e.target.style.fill = "#ffffff";
  };

  const likeButton = () => {
    if (loggedIn) {
      if (!liked.length || !liked.includes(currentUser.id)) {
        return <HeartOutlined className='post-like-icon' onClick={(e) => handleLike(e)} />;
      } else {
        return (
          <HeartTwoTone
            className='post-like-icon'
            onClick={(e) => handleDislike(e)}
            twoToneColor='#ff0000'
          />
        );
      }
    }
    return <HeartOutlined className='post-like-icon' />;
  };

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
        <div className='post-image'>{image && <Image src={image} alt='post image' />}</div>
      </div>
      <div className='post-foot'>
        <div className='post-left'>
          {likeButton()}
          <span className='post-likes'>Likes</span>
          <span className='post-likes-count'>{Number(post.likes)}</span>
        </div>
        <div className='post-right'>
          <MessageOutlined className='post-comment-icon' />
          <span className='post-comments-button'>comments</span>
          <span className='post-comments-count'>{post.comments.length}</span>
        </div>
      </div>
      {comments?.length ? (
        <div className='post-comments'>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Post;
