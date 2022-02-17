import React, { useState } from "react";
import { Image } from "antd";
import { Icon } from '@iconify/react';
import { Button } from "antd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");


function FavoredCard({post, changeBackground, changeBack, handleClick, deletePost, showMore, setShowMore }) {
  const { id, content, user, likes, date} = post;
  return (
    <div className='post'>
      <div className='post-head'>
        <div className='post-user'>
        <Image width={48} src={user.avatar} alt={user.name || user.username} />
          <div className='post-user-info'>{user.name || user.username}</div>
        </div>
        <div className='post-date'>{timeAgo.format(date)}</div>
      </div>
      <div className='post-body'>
        <span className='post-content'>{content.substring(0, 80) || content}</span>
        <span className='post-heart' style={{ float: 'right' }}>
                  <Icon icon="ant-design:heart-filled" likes={likes} color="pink" inline={true}
                    onMouseEnter={changeBackground}
                    onMouseLeave={changeBack}
                    onClick={deletePost} />
                </span>
                <Button type='link' value={id} className="btn" onClick={handleClick} >[Read more]</Button>
      </div>
    </div>
  );
}

export default FavoredCard;





