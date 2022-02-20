import { commentSchema } from "../../helpers/schemas";

// Action Types
const LOAD_COMMENTS = "comment/LOAD_COMMENTS";
const COMMENT_ADD = "comment/COMMENT_ADD";
const COMMENT_UPDATE = "comment/COMMENT_UPDATE";
const COMMENT_DELETE = "comment/COMMENT_DELETE";
const COMMENT_LIKE = "comment/COMMENT_LIKE";
const COMMENT_DISLIKE = "comment/COMMENT_DISLIKE";
const COMMENT_ERROR = "comment/COMMENT_ERROR";

// Actions
export const loadComments = (payload) => ({ type: LOAD_COMMENTS, payload });
export const commentAdd = (payload) => ({ type: COMMENT_ADD, payload });
export const commentUpdate = (payload) => ({ type: COMMENT_UPDATE, payload });
export const commentDelete = (payload) => ({ type: COMMENT_DELETE, payload });
export const commentLike = (payload) => ({ type: COMMENT_LIKE, payload });
export const commentDislike = (payload) => ({ type: COMMENT_DISLIKE, payload });
export const commentError = (payload) => ({ type: COMMENT_ERROR, payload });

// Initial State of the commentDuck
const initialState = {
  comment: { ...commentSchema, id: 0 },
  comments: [],
  errorsComment: "",
};

// commentDuck Reducer
const commentDuck = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    case COMMENT_ADD:
      return {
        ...state,
        comments: [...state.comments, { ...commentSchema, payload }],
      };
    case COMMENT_UPDATE:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === payload.id) comment = { ...comment, payload };
          return comment;
        }),
      };
    case COMMENT_DELETE:
      return {
        ...state,
        comments: state.comments.filter((comment) => !comment.id === payload),
      };
    case COMMENT_LIKE:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === payload.commentid) comment = { ...comment, likes: comment.likes + 1 };
          return comment;
        }),
      };
    case COMMENT_DISLIKE:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === payload.commentid) comment = { ...comment, likes: comment.likes - 1 };
          return comment;
        }),
      };
    case COMMENT_ERROR:
      return {
        ...state,
        errorsComment: payload,
      };
    default:
      return state;
  }
};

export default commentDuck;
