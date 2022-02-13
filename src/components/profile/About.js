import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getPosts from "../../services/getPosts";

function About() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userDuck);
  const { posts } = useSelector((state) => state.postDuck);

  //Fetch user object by profile user id
  useEffect(() => {
    if (profile.id) {
      dispatch(getPosts("?userid=" + profile.id, true));
    } else {
      console.log("no posts found");
    }
  }, [dispatch, profile]);

  return (
    <div>
      <p>Username: {profile.username}</p>
      <p>Twitter: {profile.tw}</p>
      <p>ID: {profile.id}</p>
      {posts.map((post) => (
        <div key={post.id}>
          <p>Content: {post.content}</p>
          <p>Image: {post?.image}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default About;
