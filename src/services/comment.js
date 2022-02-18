import api from "../helpers/api";
import { postComment } from "../redux/ducks/postDuck";
import { commentAdd, commentUpdate, commentDelete, commentError } from "../redux/ducks/commentDuck";
import { commentSchema } from "../helpers/schemas";

// Add new comment ................................
export const addComment = (data) => (dispatch) => {
  const commentData = { ...commentSchema, ...data };

  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  })
    .then((res) => res.json())
    .then((comment) => {
      dispatch(commentAdd(comment));
      dispatch(postComment(comment));
    })
    .catch((err) => {
      dispatch(commentError(err.message));
    });
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
      })
      .catch((err) => {
        dispatch(commentError(err.message));
      });
  } else {
    dispatch(commentError("Comment ID is not found"));
  }
};

// Delete comment by id .............................
export const deleteComment = (id) => (dispatch) => {
  if (id) {
    fetch(`${api}/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    })
      .then((res) => res.json())
      .then((comment) => {
        dispatch(commentDelete(id));
      })
      .catch((err) => {
        dispatch(commentError(err.message));
      });
  } else {
    dispatch(commentError("Comment ID is not found"));
  }
};
