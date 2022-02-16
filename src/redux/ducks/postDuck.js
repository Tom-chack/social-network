import { postSchema } from "../../helpers/schemas";

// Action Types
const LOAD_POSTS = "post/LOAD_POSTS";
const ADD_POST = "post/ADD_POST";
const UPDATE_POST = "post/UPDATE_POST";
const DELETE_POST = "post/DELETE_POST";
const POST_ERROR = "post/POST_ERROR";

// Actions
export const loadPosts = (payload) => ({ type: LOAD_POSTS, payload });
export const addPost = (payload) => ({ type: ADD_POST, payload });
export const updatePost = (payload) => ({ type: UPDATE_POST, payload });
export const deletePost = (payload) => ({ type: DELETE_POST, payload });
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
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, { ...postSchema, payload }],
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.id) post = { ...post, payload };
          return post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => !post.id === payload.id),
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
