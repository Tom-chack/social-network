import api from "../helpers/api";
import { userUpdate } from "../redux/ducks/userDuck";
import { postAdd, postUpdate, postDelete, postError } from "../redux/ducks/postDuck";
import { postSchema } from "../helpers/schemas";
import getUser from "./getUser";

// Add new post ................................
export const addPost = (data) => async (dispatch, getState) => {
  let { user } = getState().userDuck;
  const post = { ...postSchema, content: data.content, userid: user.id };

  try {
    let currentUser = await getUser(user.id);
    let postRes = await fetch(`${api}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    let postData = await postRes.json();

    if (data?.image) {
      dispatch(postAdd({ ...postData, user: currentUser, image: data.image }));
      let image = { id: postData.id, postid: postData.id, url: data.image };
      await fetch(`${api}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image),
      });
    } else {
      dispatch(postAdd({ ...postData, user: currentUser }));
    }

    await fetch(`${api}/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ posts: currentUser.posts + 1 }),
    });
    dispatch(userUpdate({ id: currentUser.id, posts: currentUser.posts + 1 }));
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
        body: JSON.stringify({ ...data, image: "", user: {}, comments: [] }),
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
export const deletePost = (post) => async (dispatch) => {
  const { id, liked, image, comments } = post;
  if (id) {
    try {
      // Delete post
      await fetch(`${api}/posts/${id}`, {
        method: "DELETE",
      });
      // Delete post image
      if (image) {
        await fetch(`${api}/images/${id}`, {
          method: "DELETE",
        });
      }
      // Delete post comments
      let commentCount = comments?.length;
      if (commentCount > 0) {
        for (let c = 0; c < commentCount; c++) {
          await fetch(`${api}/comments/${comments[c].id}`, {
            method: "DELETE",
          });
        }
      }
      // Delete post likes
      let likedCount = liked?.length;
      if (likedCount > 0) {
        for (let l = 0; l < likedCount; l++) {
          await fetch(`${api}/likes/${liked[l]}-${id}`, {
            method: "DELETE",
          });
        }
      }
      // Update posts count
      let currentUser = await getUser(post.userid);
      await fetch(`${api}/users/${post.userid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ posts: currentUser.posts - 1 }),
      });

      dispatch(postDelete(id));
      dispatch(userUpdate({ id: currentUser.id, posts: currentUser.posts - 1 }));
    } catch (err) {
      dispatch(postError(err.message));
    }
  } else {
    dispatch(postError("Post ID is not found"));
  }
};
