import api from "../helpers/api";
import { postAdd, postUpdate, postDelete, postError } from "../redux/ducks/postDuck";
import { postSchema } from "../helpers/schemas";

// Add new post ................................
export const addPost = (data) => async (dispatch, getState) => {
  let { user } = getState().userDuck;
  const post = { ...postSchema, content: data.content, userid: user.id };

  try {
    let postRes = await fetch(`${api}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    let postData = await postRes.json();
    console.log(postData);
    dispatch(postAdd({ ...postData, image: data.image }));

    let image = { postid: postData.id, url: data.image };
    await fetch(`${api}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(image),
    });
  } catch (e) {
    dispatch(postError(e.message));
  }
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
