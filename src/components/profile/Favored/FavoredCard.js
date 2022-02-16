import React, { useState } from "react";
import { Card, Avatar } from "antd";
import { Icon } from '@iconify/react';
import { Button } from "antd";
import { Col } from "antd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const { Meta } = Card;

function FavoredCard({ changeBackground, changeBack, handleClick, deletePost, user, id, date, content, likes, avatar, showMore, setShowMore }) {

  return (
    <div>
      <div key={id} id={id} >
        <Col flex='1 1 200px' style={{ padding: "20px 20px 0 0" }}>
          <Card className="card"
            hoverable
            style={{ backgroundColor: "#fafafa", width: '90%', margin: ' 0 auto' }}
          >
            <Meta
              title={<>
                <span>{user}</span>
                <span style={{ float: 'right' }}>
                  <Icon icon="ant-design:heart-filled" likes={likes} color="pink" inline={true}
                    onMouseEnter={changeBackground}
                    onMouseLeave={changeBack}
                    onClick={deletePost} />
                </span>
              </>}
              avatar={<Avatar src={avatar} />}
              description={<>
                Posted {timeAgo.format(date)}
                <p >
                  {showMore ? content : `${content.substring(0, 80)}`}
                  <Button className="card" type='link' value={id} className="btn" onClick={handleClick} >
                    {showMore ? "[Read less]" : "[Read more]"}
                  </Button>
                </p>
              </>}
            />
          </Card>
        </Col>
      </div>
    </div>
  );
}

export default FavoredCard;




