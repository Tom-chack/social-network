import { postSchema } from "../../helpers/schemas";

// Action Types
const LOAD_POSTS = "post/LOAD_POSTS";
const POST_ADD = "post/POST_ADD";
const POST_UPDATE = "post/POST_UPDATE";
const POST_DELETE = "post/POST_DELETE";
const POST_LIKE = "post/POST_LIKE";
const POST_DISLIKE = "post/POST_DISLIKE";
const POST_COMMENT_ADD = "post/POST_COMMENT_ADD";
const POST_COMMENT_DELETE = "post/POST_COMMENT_DELETE";
const POST_ERROR = "post/POST_ERROR";

// Actions
export const loadPosts = (payload) => ({ type: LOAD_POSTS, payload });
export const postAdd = (payload) => ({ type: POST_ADD, payload });
export const postUpdate = (payload) => ({ type: POST_UPDATE, payload });
export const postDelete = (payload) => ({ type: POST_DELETE, payload });
export const postLike = (payload) => ({ type: POST_LIKE, payload });
export const postDislike = (payload) => ({ type: POST_DISLIKE, payload });
export const postCommentAdd = (payload) => ({ type: POST_COMMENT_ADD, payload });
export const postCommentDelete = (payload) => ({ type: POST_COMMENT_DELETE, payload });
export const postError = (payload) => ({ type: POST_ERROR, payload });

// Initial State of the postDuck
const initialState = {
  post: { ...postSchema, id: 0 },
  posts: [],
  errorsPost: "",
};

// postDuck Reducer
const postDuck = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: payload,
      };
    case POST_ADD:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case POST_UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.id) post = { ...post, ...payload };
          return post;
        }),
      };
    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
      };
    case POST_COMMENT_ADD:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postid) post = { ...post, comments: [...post.comments, payload] };
          return post;
        }),
      };
    case POST_COMMENT_DELETE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postid) {
            post = {
              ...post,
              comments: post.comments.filter((comment) => comment.id !== payload.id),
            };
          }
          return post;
        }),
      };
    case POST_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postid) {
            return {
              ...post,
              likes: post.likes + 1,
              liked: [...new Set([...post.liked, payload.userid])],
            };
          } else {
            return post;
          }
        }),
      };
    case POST_DISLIKE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.postid)
            post = {
              ...post,
              likes: post.likes - 1,
              liked: post.liked.filter((userid) => userid !== payload.userid),
            };
          return post;
        }),
      };
    case POST_ERROR:
      return {
        ...state,
        errorsPost: payload,
      };
    default:
      return state;
  }
};

export default postDuck;
