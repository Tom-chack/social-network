// Action Types
const USER_SET = "user/USER_SET";
const USER_INIT = "user/USER_INIT";
const USER_LOGIN = "user/USER_LOGIN";
const USER_REGISTER = "user/USER_REGISTER";
const USER_REGISTERED = "user/USER_REGISTERED";
const USER_ERROR = "user/USER_ERROR";
const LOAD_USERS = "user/LOAD_USERS";

// Actions
export const userSet = (payload) => ({ type: USER_SET, payload });
export const userInit = (payload) => ({ type: USER_INIT, payload });
export const userLogin = (payload) => ({ type: USER_LOGIN, payload });
export const userRegister = (payload) => ({ type: USER_REGISTER, payload });
export const userRegistered = (payload) => ({ type: USER_REGISTERED, payload });
export const userError = (payload) => ({ type: USER_ERROR, payload });
export const loadUsers = (payload) => ({ type: LOAD_USERS, payload });

// Initial State of the userDuck

const initialState = {
  user: { id: 0, username: "", email: "", password: "", date: "", about: "", remember: false },
  users: [],
  loggedIn: false,
  sinedUp: false,
  errorsUser: "",
};

// userDuck Reducer
const userDuck = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_SET:
      return {
        ...state,
        user: payload,
        loggedIn: true,
        errorsUser: "",
      };
    case USER_INIT:
      const currentUser = JSON.parse(localStorage.getItem("_user")) || {};
      return {
        ...state,
        user: currentUser,
        loggedIn: currentUser.id ? true : false,
        errorsUser: "",
      };
    case USER_LOGIN:
      localStorage.setItem(
        "_user",
        JSON.stringify({ id: payload.id, username: payload.username, remeber: payload.remeber })
      );
      return {
        ...state,
        user: payload,
        loggedIn: true,
        errorsUser: "",
      };
    case USER_REGISTER:
      return {
        ...state,
        signedUp: true,
        errorsUser: "",
      };
    case USER_REGISTERED:
      return {
        ...state,
        signedUp: false,
      };
    case LOAD_USERS:
      return {
        ...state,
        users: payload,
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
