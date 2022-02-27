import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import getPosts from "../services/getPosts";
import { Row, Col, Card, Radio, Skeleton } from "antd";
import Post from "./Post/Post";
import MembersWidget from "./widgets/MembersWidget";
import PhotoWidget from "./widgets/PhotosWidget";

import InfiniteScroll from "react-infinite-scroll-component";

const perPage = 10;

function Home() {
  //Redux functions
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postDuck);

  //Local states
  const [filter, setFilter] = useState("?_sort=date&_order=desc");

  //Infinite Scroll
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(true);

  const fetchMoreData = useCallback(() => {
    if (items.length >= posts.length) {
      setMore(false);
      return;
    }
    setPage(page + 1);
    setTimeout(() => {
      let nextItems = [...items, ...posts.slice(page * perPage, (page + 1) * perPage)];
      setItems(nextItems);
    }, 2000);
  }, [posts, items, page]);

  //Fetch user object by profile user id
  useEffect(() => {
    dispatch(getPosts(filter));
    setMore(true);
  }, [dispatch, filter]);

  //Set items after first loading of posts
  useEffect(() => {
    setItems(posts.slice(0, perPage));
    setPage(1);
  }, [posts]);

  //Skeleton

  const SkeletonComponent = () => {
    return (
      <>
        <Skeleton active avatar paragraph={{ rows: 4 }}></Skeleton>
        <div className='s-sep'></div>
        <Skeleton active avatar paragraph={{ rows: 4 }}></Skeleton>
        <div className='s-sep'></div>
        <Skeleton active avatar paragraph={{ rows: 4 }}></Skeleton>
        <div className='s-sep'></div>
        <Skeleton active avatar paragraph={{ rows: 4 }}></Skeleton>
      </>
    );
  };

  return (
    <div className='home'>
      <Row>
        <Col flex='1 1 300px' style={{ padding: "20px" }}>
          <Card style={{ backgroundColor: "#fafafa" }}>
            <Row>
              <Col flex={5}>
                <h2 style={{ margin: 0 }}>News Feed</h2>
              </Col>
              <Col flex={1} align='right'>
                <Radio.Group
                  defaultValue={filter}
                  buttonStyle='solid'
                  size='middle'
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <Radio.Button value='?_sort=date&_order=desc'>Newest</Radio.Button>
                  <Radio.Button value='?_sort=date&_order=asc'>Oldest</Radio.Button>
                  <Radio.Button value='?_sort=likes&_order=desc'>Top Rated</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          </Card>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={more}
            loader={<SkeletonComponent />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {items.map((post) => (
              <Card
                key={post.id}
                className='post'
                style={{ backgroundColor: "#fafafa", marginTop: "20px" }}
              >
                <Post post={post} />
              </Card>
            ))}
          </InfiniteScroll>
        </Col>
        <Col flex='0 1 400px' style={{ padding: "20px 20px 0 0" }}>
          <MembersWidget />
          <PhotoWidget />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
