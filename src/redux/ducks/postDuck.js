import { postSchema } from "../../helpers/schemas";

// Action Types
const LOAD_POSTS = "post/LOAD_POSTS";
const POST_ADD = "post/POST_ADD";
const POST_UPDATE = "post/POST_UPDATE";
const POST_DELETE = "post/POST_DELETE";
const POST_ERROR = "post/POST_ERROR";

// Actions
export const loadPosts = (payload) => ({ type: LOAD_POSTS, payload });
export const postAdd = (payload) => ({ type: POST_ADD, payload });
export const postUpdate = (payload) => ({ type: POST_UPDATE, payload });
export const postDelete = (payload) => ({ type: POST_DELETE, payload });
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
        posts: [...state.posts, { ...postSchema, payload }],
      };
    case POST_UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.id) post = { ...post, payload };
          return post;
        }),
      };
    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => !post.id === payload),
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
