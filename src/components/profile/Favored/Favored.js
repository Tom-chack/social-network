import React, { useEffect, useState } from "react";
import FavoredCard from "./FavoredCard";
import { useDispatch, useSelector } from 'react-redux';
import getPosts from "../../../services/getPosts";
import { postDelete } from "../../../redux/ducks/postDuck";
import { Pagination } from 'antd';
import { Row, Col, Radio } from "antd";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addLocale(en);

function Favored() {
  //Redux functions
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userDuck);
  const { posts } = useSelector((state) => state.postDuck);

  //Local states
  const [showMore, setShowMore] = useState(false);
  const [filter, setFilter] = useState('?_sort=date&_order=desc');
  const [page, setPage] = useState(1);

  const postPerPage = 5;
  const indexofLastPage = page + postPerPage;
  const indexofFirstPage = indexofLastPage - postPerPage;
  let slicedPosts = posts;
  const currentPosts = slicedPosts.slice(indexofFirstPage, indexofLastPage);

  //Fetch user object by profile user id and likes by userid

  useEffect(() => {
    if (profile.id) {
      dispatch(getPosts(filter, '?favoredby=' + profile.id));
    }
  }, [dispatch, filter, profile]);


  // deleting post when like icon is clicked
  const id = posts.map(post => post.id);
  const deletePost = (likes) => {
    if (likes !== undefined && id !== undefined) {
      likes = likes - 1;
      console.log(id, likes);
      dispatch(
        postDelete({ id: id })
      )
    }
  }
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

  function handleClick(e) {
    console.log(e.currentTarget.value);
    console.log(posts[0]);
    setShowMore(!showMore);
  }

  return (
    <div>
      <Row>
        <Col flex={5} style={{ margin: 0 }}>
          <Pagination
            total={posts.length}
            current={page}
            pageSize={postPerPage}
            onChange={(value) => setPage(value)}
            defaultCurrent={1}
            style={{ display: 'inline-block' }}
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
      <div >
        {currentPosts.map(({ user, id, date, content, likes }) =>
          <FavoredCard
            user={user.name}
            key={id}
            date={date}
            avatar={user.avatar}
            id={id}
            content={content}
            likes={likes}
            showMore={showMore}
            setShowMore={setShowMore}
            changeBackground={changeBackground}
            changeBack={changeBack}
            handleClick={handleClick}
            deletePost={deletePost}
          />)}
      </div>

      {console.log(posts[0])}

    </div>
  );
}

export default Favored;




