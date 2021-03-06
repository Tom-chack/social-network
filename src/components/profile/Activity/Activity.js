import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { useSelector, useDispatch } from "react-redux";
import getPosts from "../../../services/getPosts";
import PostEditor from "../../Editor/postEditor";
import { Card } from "antd";
import { sortByDesc } from "../../../helpers/sort";

function Activity() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postDuck);
  const { profile, user, loggedIn } = useSelector((state) => state.userDuck);
  const postLength = posts.length;
  //load more
  const [data, setData] = useState(posts);
  const [visible, setVisible] = useState(5);

  //Tom /change-1

  useEffect(() => {
    if (profile.id) {
      dispatch(getPosts(`?userid=${profile.id}&_sort=date&_order=desc`));
    } else {
      console.log("no posts found");
    }
  }, [dispatch, profile]);

  useEffect(() => setData(posts), [posts, profile]);

  const loadMoreItems = () => {
    setVisible((previtem) => previtem + 5);
  };

  return (
    <div className='activityMain'>
      {loggedIn && profile.id === user.id ? (
        <Card style={{ backgroundColor: "#fafafa" }}>
          <PostEditor editorId='activity-editor' buttonText='Publish a new post' />
        </Card>
      ) : null}

      <div className='activity-list'>
        {sortByDesc(data, "date")
          .slice(0, visible)
          .map((post) => (
            <ActivityCard
              classname='activityCard'
              users={post.user.name}
              usersName={post.user.username}
              key={post.id}
              userid={post.user.id}
              date={post.date}
              avatars={post.user.avatar}
              id={post.id}
              content={post.content}
              likes={post.likes}
              image={post.image}
              comments={post.comments}
              liked={post.liked}
              post={post}
            />
          ))}
      </div>
      <div className='loadMore'>
        {visible >= postLength ? null : <button onClick={loadMoreItems}>Load more</button>}
      </div>
    </div>
  );
}
export default Activity;
