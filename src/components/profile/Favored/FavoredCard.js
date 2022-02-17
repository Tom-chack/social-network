import React from "react";
import { Image } from "antd";
import { Icon } from '@iconify/react';
import { Button } from "antd";
import ReadMoreReact from 'read-more-react';
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");


function FavoredCard({ post, changeBackground, changeBack, handleClick, deletePost, showMore, setShowMore }) {
  const { id, content, user, likes, date } = post;

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
        <span className='post-heart' style={{ float: 'right' }}>
          <Icon icon="ant-design:heart-filled" likes={likes} color="pink" inline={true}
            onMouseEnter={changeBackground}
            onMouseLeave={changeBack}
            onClick={deletePost} />
        </span>
        <ReadMoreReact text={content}
          min={80}
          ideal={100}
          max={content.length}
          readMoreText={"Read more ▼"} />
      </div>

    </div>

  );
}

export default FavoredCard;





