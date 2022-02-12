import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import getPosts from "../../services/getPosts";
import { dateToLocalFormat } from 'date-format-ms';
import { Card, Avatar } from "antd";
import { Pagination } from 'antd';
import { Select } from 'antd';
import { Icon } from '@iconify/react';
import { Button } from "antd";

const { Option } = Select;
const { Meta } = Card;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log('search:', val);
}


function getDate(sec) {
  return dateToLocalFormat(new Date(sec), 'd.m.Y')
}

function Favored() {

  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userDuck);
  const { posts } = useSelector((state) => state.postDuck);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (profile.id) {
      dispatch(getPosts('?userid=' + profile.id));
    }
  }, [dispatch, profile]);

  return (
    <div>
      <Pagination defaultCurrent={1} total={50} style={{ display: 'inline-block' }}
      />
      <Select style={{ display: 'inline-block', float: 'right' }}
        showSearch
        placeholder="Sort by"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="newest">Newest</Option>
        <Option value="oldest">Oldest</Option>
        <Option value="top">Top rated</Option>
      </Select>

      {posts.map((post) => (
        <div style={{ margin: '25px 0' }}>
          <Card key={post.id}
            hoverable
            style={{ width: '80%', margin: ' 0 auto' }}
            cover={
              <img
                src={post.image}
                alt={`${profile.username}'s photo here`}
              />
            }
          >
            <Meta
              title={<>
                <span>{profile.username}</span>
                <span style={{ float: 'right' }}>
                  <Icon icon="ant-design:heart-filled" color="pink" inline={true} />
                </span>
              </>}
              avatar={<Avatar src={posts.image} />}
              description={<>
                Posted {getDate(post.date)}
                <p>{showMore ? post.content : `${post.content.substring(0, 50)}`}
                  <Button type='link' className="btn" onClick={() => setShowMore(!showMore)} >
                    {showMore ? "[Read less]" : "[Read more]"}
                  </Button>
                </p>
              </>}
            />
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Favored;
