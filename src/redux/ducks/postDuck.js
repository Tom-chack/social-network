import { postSchema } from "../../helpers/schemas";

// Action Types
const LOAD_POSTS = "post/LOAD_POSTS";
const POST_ERROR = "post/POST_ERROR";

// Actions
export const loadPosts = (payload) => ({ type: LOAD_POSTS, payload });
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
