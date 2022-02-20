import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getPosts from "../services/getPosts";
//import getUsers from "../services/getUsers";
import { deleteComment } from "../services/comment";
import PostEditor from "../components/Editor/postEditor";

function Test() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postDuck);
  const { loggedIn } = useSelector((state) => state.userDuck);

  //Fetch user object by profile user id
  useEffect(() => {
    dispatch(getPosts());
    //dispatch(getUsers("?_sort=date&_order=desc&_start=1&_end=3"));
  }, [dispatch]);

  return (
    <div>
      {loggedIn && <PostEditor />}
      <hr />
      {posts.map((post) => (
        <div key={post.id}>
          <div>{post.content}</div>
          <div>
            {post.comments &&
              post.comments.map((comment) => {
                return (
                  <div
                    key={comment.id}
                    style={{
                      background: "#333",
                      color: "#fff",
                      padding: "20px",
                      borderBottom: "2px solid #fff",
                    }}
                  >
                    {comment.content}
                    <button onClick={() => dispatch(deleteComment(comment))}>
                      Delete [{comment.id}]
                    </button>
                  </div>
                );
              })}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Test;
