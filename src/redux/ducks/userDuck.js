// Action Types
const USER_INIT = "user/USER_INIT";
const USER_LOGIN = "user/USER_LOGIN";
const USER_ERROR = "user/USER_ERROR";

// Actions
export const userInit = (payload) => ({ type: USER_INIT, payload });
export const userLogin = (payload) => ({ type: USER_LOGIN, payload });
export const userError = (payload) => ({ type: USER_ERROR, payload });

// Initial State of the userDuck

const initialState = {
  user: { id: 0, username: "", email: "", password: "", about: "" },
  loggedIn: false,
  users: [],
  errorsUser: "",
};

// userDuck Reducer
const userDuck = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_INIT:
      const currentUser = JSON.parse(localStorage.getItem("_user")) || {};
      return {
        ...state,
        user: currentUser,
        loggedIn: currentUser.id ? true : false,
        errorsUser: [],
      };
    case USER_LOGIN:
      localStorage.setItem("_user", JSON.stringify({ id: payload.id, username: payload.username }));
      return {
        ...state,
        user: payload,
        loggedIn: true,
        errorsUser: [],
      };
    case USER_ERROR:
      return {
        ...state,
        errorsUser: payload,
      };
    default:
      return state;
  }
};

export default userDuck;
