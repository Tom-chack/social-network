import React, { useState } from "react";
import { Card, Avatar, Image } from "antd";
import { Icon } from '@iconify/react';
import { Button } from "antd";
import { Col } from "antd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const { Meta } = Card;

function FavoredCard({post, changeBackground, changeBack, handleClick, deletePost, showMore, setShowMore }) {
  const { id, content, image, user, likes, avatar, date} = post;
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
        <div className='post-heart'>
        <span style={{ float: 'right' }}>
                  <Icon icon="ant-design:heart-filled" likes={likes} color="pink" inline={true}
                    onMouseEnter={changeBackground}
                    onMouseLeave={changeBack}
                    onClick={deletePost} />
                </span>
               
        </div>
      </div>
    </div>
  );
}

export default FavoredCard;





