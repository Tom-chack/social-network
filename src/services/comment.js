import api from "../helpers/api";
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
      body: JSON.stringify(commentData),
    });

    let comment = await commentRes.json();

    dispatch(commentAdd({ ...comment, user: currentUser }));
    dispatch(postCommentAdd({ ...comment, user: currentUser }));
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
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((comment) => {
        dispatch(commentUpdate(comment));
        dispatch(postCommentUpdate(comment));
      })
      .catch((err) => {
        dispatch(commentError(err.message));
      });
  } else {
    dispatch(commentError("Comment ID is not found"));
  }
};

// Delete comment by id .............................
export const deleteComment = (comment) => (dispatch) => {
  const { id } = comment;
  if (id) {
    fetch(`${api}/comments/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(commentDelete(id));
        dispatch(postCommentDelete(comment));
      })
      .catch((err) => {
        dispatch(commentError(err.message));
      });
  } else {
    dispatch(commentError("Comment ID is not found"));
  }
};
