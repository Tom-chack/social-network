import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getPosts from "../services/getPosts";
import { deleteComment } from "../services/comment";

function Test() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postDuck);

  //Fetch user object by profile user id
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div>{post.content}</div>
          <div>
            {post.comments.map((comment) => {
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
