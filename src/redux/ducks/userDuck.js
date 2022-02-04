// Action Types
const USER_LOGIN = "user/USER_LOGIN";
const USER_ERROR = "user/USER_ERROR";

// Actions
export const userLogin = (payload) => ({ type: USER_LOGIN, payload });
export const userError = (payload) => ({ type: USER_ERROR, payload });

// Initial State of the userDuck
const currentuser = JSON.parse(localStorage.getItem("_user")) || {};

const initialState = {
  user: { username: "", email: "", password: "" },
  loggedIn: currentuser.id ? true : false,
  users: [],
  errors: [],
};

// userDuck Reducer
const userDuck = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      localStorage.setItem("_user", JSON.stringify(payload));
      return {
        ...state,
        errors: [],
        user: payload,
        loggedIn: true,
      };
    case USER_ERROR:
      return {
        ...state,
        errors: [...state.errors, payload],
      };
    default:
      return state;
  }
};

export default userDuck;
