import api from "../helpers/api";
import { postAdd, postUpdate, postDelete, postError } from "../redux/ducks/postDuck";
import { postSchema } from "../helpers/schemas";

// Add new post ................................
export const addPost = (data) => (dispatch) => {
  const postData = { ...postSchema, ...data };

  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((post) => {
      dispatch(postAdd(post));
    })
    .catch((err) => {
      dispatch(postError(err.message));
    });
};

// Update post by id ..............................
export const updatePost = (postData) => (dispatch) => {
  //const postData = { ...postSchema, ...data };
  if (postData.id) {
    fetch(`${api}/posts/${postData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((post) => {
        dispatch(postUpdate(post));
      })
      .catch((err) => {
        dispatch(postError(err.message));
      });
  } else {
    dispatch(postError("Post ID is not found"));
  }
};

// Delete post by id .............................
export const deletePost = (id) => (dispatch) => {
  if (id) {
    fetch(`${api}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    })
      .then((res) => res.json())
      .then((post) => {
        dispatch(postDelete(id));
      })
      .catch((err) => {
        dispatch(postError(err.message));
      });
  } else {
    dispatch(postError("Post ID is not found"));
  }
};
