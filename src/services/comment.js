import api from "../helpers/api";
import { userUpdate } from "../redux/ducks/userDuck";
import { postCommentAdd, postCommentUpdate, postCommentDelete } from "../redux/ducks/postDuck";
import { commentAdd, commentUpdate, commentDelete, commentError } from "../redux/ducks/commentDuck";
import { commentSchema } from "../helpers/schemas";
import getUser from "./getUser";

// Add new comment ................................
export const addComment = (data) => async (dispatch, getState) => {
  let { user } = getState().userDuck;
  try {
    let currentUser = await getUser(user.id);
    let commentData = { ...commentSchema, ...data, userid: user.id };

    let commentRes = await fetch(`${api}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...commentData, user: {} }),
    });

    await fetch(`${api}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comments: currentUser.comments + 1 }),
    });

    let comment = await commentRes.json();

    dispatch(commentAdd({ ...comment, user: currentUser }));
    dispatch(postCommentAdd({ ...comment, user: currentUser }));
    dispatch(userUpdate({ id: currentUser.id, comments: currentUser.comments + 1 }));
  } catch (e) {
    dispatch(commentError(e.message));
  }
};

// Update comment by id ..............................
export const updateComment = (commentData) => (dispatch) => {
  //const commentData = { ...commentSchema, ...data };
  if (commentData.id) {
    fetch(`${api}/comments/${commentData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...commentData, user: {} }),
    })
      .then((res) => res.json())
      .then((comment) => {
        dispatch(commentUpdate({ ...comment, user: commentData.user }));
        dispatch(postCommentUpdate({ ...comment, user: commentData.user }));
      })
      .catch((err) => {
        dispatch(commentError(err.message));
      });
  } else {
    dispatch(commentError("Comment ID is not found"));
  }
};

// Delete comment by id .............................
export const deleteComment = (comment) => async (dispatch) => {
  const { id } = comment;
  if (id) {
    try {
      await fetch(`${api}/comments/${id}`, {
        method: "DELETE",
      });
      let currentUser = await getUser(comment.userid);
      await fetch(`${api}/users/${comment.userid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: currentUser.comments - 1 }),
      });
      dispatch(commentDelete(id));
      dispatch(postCommentDelete(comment));
      dispatch(userUpdate({ id: currentUser.id, comments: currentUser.comments - 1 }));
    } catch (err) {
      dispatch(commentError(err.message));
    }
  } else {
    dispatch(commentError("Comment ID is not found"));
  }
};
