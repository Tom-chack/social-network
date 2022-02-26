import { userSchema } from "../../helpers/schemas";

// Action Types
const USER_INIT = "user/USER_INIT";
const USER_LOGIN = "user/USER_LOGIN";
const USER_UPDATE = "user/USER_UPDATE";
const USER_LOGOUT = "user/USER_LOGOUT";
const USER_REGISTER = "user/USER_REGISTER";
const USER_REGISTERED = "user/USER_REGISTERED";
const USER_ERROR = "user/USER_ERROR";
const LOAD_USERS = "user/LOAD_USERS";
const PROFILE_INIT = "user/PROFILE_INIT";

// Actions
export const userInit = (payload) => ({ type: USER_INIT, payload });
export const userLogin = (payload) => ({ type: USER_LOGIN, payload });
export const userUpdate = (payload) => ({ type: USER_UPDATE, payload });
export const userLogout = (payload) => ({ type: USER_LOGOUT, payload });
export const userRegister = (payload) => ({ type: USER_REGISTER, payload });
export const userRegistered = (payload) => ({ type: USER_REGISTERED, payload });
export const userError = (payload) => ({ type: USER_ERROR, payload });
export const loadUsers = (payload) => ({ type: LOAD_USERS, payload });
export const profileInit = (payload) => ({ type: PROFILE_INIT, payload });

// Initial State of the userDuck
const initialState = {
  user: { ...userSchema, id: 0 },
  profile: { ...userSchema, id: 0 },
  users: [],
  loggedIn: false,
  signedUp: false,
  errorsUser: "",
};

// userDuck Reducer
const userDuck = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USERS:
      return {
        ...state,
        users: payload,
      };
    case USER_INIT:
      const currentUser = JSON.parse(localStorage.getItem("_user")) || {};
      return {
        ...state,
        user: currentUser,
        loggedIn: currentUser.id ? true : false,
        errorsUser: "",
      };
    case PROFILE_INIT:
      return {
        ...state,
        profile: payload,
        errorsUser: "",
      };
    case USER_LOGIN:
      localStorage.setItem(
        "_user",
        JSON.stringify({
          id: payload.id,
          username: payload.username,
          remember: payload.remember,
        })
      );
      return {
        ...state,
        user: payload,
        loggedIn: true,
        errorsUser: "",
      };
    case USER_UPDATE:
      // Update current logged-in user if the user is on his/her profile page
      if (payload.id === state.user.id && payload.id === state.profile?.id) {
        return {
          ...state,
          user: { ...state.user, ...payload, avatar: "", cover: "" },
          users: state.users.map((user) => {
            if (user.id === payload.id) user = { ...user, ...payload };
            return user;
          }),
          profile: { ...state.profile, ...payload },
          errorsUser: "",
        };
      } // Update current logged-in user if the user is not on his/her profile page
      else if (payload.id === state.user.id && payload.id !== state.profile?.id) {
        return {
          ...state,
          user: { ...state.user, ...payload, avatar: "", cover: "" },
          users: state.users.map((user) => {
            if (user.id === payload.id) user = { ...user, ...payload };
            return user;
          }),
          errorsUser: "",
        };
      } // Update user and his/her profile page, this user is not the current logged-in user
      else if (payload.id !== state.user?.id && payload.id === state.profile?.id) {
        return {
          ...state,
          users: state.users.map((user) => {
            if (user.id === payload.id) user = { ...user, ...payload };
            return user;
          }),
          profile: { ...state.profile, ...payload },
          errorsUser: "",
        };
      } // Update user in other cases
      else {
        return {
          ...state,
          users: state.users.map((user) => {
            if (user.id === payload.id) user = { ...user, ...payload };
            return user;
          }),
          errorsUser: "",
        };
      }
    case USER_LOGOUT:
      localStorage.clear("_user");
      return {
        ...state,
        user: { ...userSchema },
        loggedIn: false,
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
