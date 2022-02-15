import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import getPosts from "../../services/getPosts";
import { Card, Avatar } from "antd";
import { Pagination } from 'antd';
import { Icon } from '@iconify/react';
import { Button } from "antd";
import { Row, Col, Radio } from "antd";


import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");


const { Meta } = Card;


function Favored() {

  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userDuck);
  const { posts } = useSelector((state) => state.postDuck);

  //Local states
  const [showMore, setShowMore] = useState(false);
  const [filter, setFilter] = useState('?_sort=date&_order=desc');
const [page, setPage] = useState(1);
const [postPerPage, setPostPerPage] = useState(5);

const indexofLastPage = page + postPerPage;
const indexofFirstPage = indexofLastPage - postPerPage;
const currentPosts = posts.slice(indexofFirstPage, indexofLastPage);

  //Fetch user object by profile user id
  useEffect(() => {
    dispatch(getPosts(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    if (profile.id) {
      dispatch(getPosts('?favoredby=' + profile.id));
    }
  }, [dispatch, profile]);
  
  return (
    <div>
      <Row>
      <Col flex={5} style={{ margin: 0 }}>
      <Pagination total={posts.length} current={page} pageSize={postPerPage} onChange={(value) => setPage(value)} defaultCurrent={1} style={{ display: 'inline-block' }}
      />
      </Col>
      <Col flex={1} align='right'>
        <Radio.Group
          defaultValue={filter}
          size='middle'
          onChange={(e) => setFilter(e.target.value)}
        >
            <Radio.Button value='?_sort=date&_order=desc'>Newest</Radio.Button>
            <Radio.Button value='?_sort=date&_order=asc'>Oldest</Radio.Button>
            <Radio.Button value='?_sort=likes&_order=desc'>Top liked</Radio.Button>
        </Radio.Group>
      </Col>
      </Row>

      
      {currentPosts.map((post) => (
        <div key={post.id} style={{ margin: '20px 0' }}>
          <Card
            hoverable
            style={{ width: '80%', margin: ' 0 auto' }}
          >
            <Meta
              title={<>
                <span>{post?.user.name}</span>
                <span style={{ float: 'right' }}>
                  <Icon icon="ant-design:heart-filled" color="pink" inline={true} />
                </span>
              </>}
              avatar={<Avatar src={post?.user.avatar} />}
              description={<>
                Posted {timeAgo.format(post.date)}
                <p >{showMore ? post.content : `${post.content.substring(0, 50)}`}
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


