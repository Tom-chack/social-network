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
    if (data?.image) {
      dispatch(postAdd({ ...postData, user, image: data.image }));
      let image = { id: postData.id, postid: postData.id, url: data.image };
      await fetch(`${api}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image),
      });
    } else {
      dispatch(postAdd({ ...postData, user }));
    }
  } catch (e) {
    dispatch(postError(e.message));
  }
};

// Update post by id ..............................
export const updatePost = (data) => async (dispatch) => {
  if (data.id) {
    try {
      let postRes = await fetch(`${api}/posts/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, image: "" }),
      });
      let postData = await postRes.json();

      if (data?.image) {
        let imageRes = await fetch(`${api}/images/${data.id}`);
        let imageData = await imageRes.json();
        if (imageData.id) {
          let image = { url: data.image };
          await fetch(`${api}/images/${imageData.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(image),
          });
        } else {
          let image = { id: data.id, postid: data.id, url: data.image };
          await fetch(`${api}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(image),
          });
        }
      }
      dispatch(postUpdate({ ...postData, ...data }));
    } catch (e) {
      dispatch(postError(e.message));
    }
  } else {
    dispatch(postError("Post ID is not found"));
  }
};

// Delete post by id .............................
export const deletePost = (id) => async (dispatch) => {
  if (id) {
    try {
      await fetch(`${api}/posts/${id}`, {
        method: "DELETE",
      });
      await fetch(`${api}/images/${id}`, {
        method: "DELETE",
      });
      dispatch(postDelete(id));
    } catch (err) {
      dispatch(postError(err.message));
    }
  } else {
    dispatch(postError("Post ID is not found"));
  }
};
