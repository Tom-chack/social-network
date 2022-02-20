import React, { useEffect, useState } from "react";
import FavoredCard from "./FavoredCard";
import { useDispatch, useSelector } from 'react-redux';
import getPosts from "../../../services/getPosts";
import { Row, Col, Radio, Card } from "antd";


function Favored() {

  //Redux functions
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userDuck);
  const { posts, data } = useSelector((state) => state.postDuck);

  //Local states
  const [filter, setFilter] = useState('&_sort=date&_order=desc');

  //calculations for pagination
  
  //Fetch user object by profile user id and likes by userid
  useEffect(() => {
    if (profile.id) {
      dispatch(getPosts('?favoredby=' + profile.id + filter));
    }
  }, [dispatch, profile, filter]);


  // changing heart icon's background while hovering
  function changeBackground(e) {
    e.target.style.background = 'red';
    e.target.style.borderRadius = '10px';
    e.target.style.padding = '3px';
    e.target.style.cursor = 'default';
  }
  function changeBack(e) {
    e.target.style.backgroundColor = '';
    e.target.style.padding = '0px'
  }

  return (
    <div>
      <Row>
        <Col flex={5} style={{ margin: 0 }}>
        </Col>
        <Col flex={1} align='right'>
          <Radio.Group
            defaultValue={filter}
            size='middle'
            onChange={(e) => setFilter(e.target.value)}
          >
            <Radio.Button value='&_sort=date&_order=desc'>Newest</Radio.Button>
            <Radio.Button value='&_sort=date&_order=asc'>Oldest</Radio.Button>
            <Radio.Button value='&_sort=likes&_order=desc'>Top liked</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <div >
        { posts.map((post) =>
          <Card
            key={post.id}
            className='post'
            style={{ backgroundColor: "#fafafa", marginTop: "20px", width: "90%" }}
          >
            <FavoredCard
              post={post}
              changeBackground={changeBackground}
              changeBack={changeBack}
            />
          </Card>)}
      </div>
    </div>
  );
}

export default Favored;
