import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import getPosts from "../services/getPosts";
import { Row, Col, Card, Radio } from "antd";
import Post from "./Post/Post";

function Home() {
  //Redux functions
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postDuck);

  //Local states
  const [filter, setFilter] = useState("?_sort=date&_order=desc");

  //Fetch user object by profile user id
  useEffect(() => {
    dispatch(getPosts(filter));
  }, [dispatch, filter]);

  return (
    <div className='home'>
      <Row>
        <Col flex='1 1 200px' style={{ padding: "20px" }}>
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
                  <Radio.Button value='?_sort=date&_order=desc'>Recent</Radio.Button>
                  <Radio.Button value='?_sort=likes&_order=desc'>Popular</Radio.Button>
                  <Radio.Button value='?_sort=date&_order=asc'>Media</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          </Card>
          {posts.map((post) => (
            <Card
              key={post.id}
              className='post'
              style={{ backgroundColor: "#fafafa", marginTop: "20px" }}
            >
              <Post post={post} />
            </Card>
          ))}
        </Col>
        <Col flex='0 1 300px' style={{ padding: "20px 20px 0 0" }}>
          <Card style={{ backgroundColor: "#fafafa" }}>www</Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
