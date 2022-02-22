import { userSchema } from "../../helpers/schemas";

// Action Types
const LOAD_USERS = "users/LOAD_USERS";
const USERS_ERROR = "user/USER_ERROR";

// Actions
export const loadUsers = (payload) => ({ type: LOAD_USERS, payload });
export const usersError = (payload) => ({ type: USERS_ERROR, payload });

// Initial State of the userDuck
const initialState = {
  user: { ...userSchema, id: 0 },
  users: [],
  errorsUser: "",
};

// imageDuck Reducer
const widgetDuck = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USERS:
      return {
        ...state,
        users: payload,
      };
    case USERS_ERROR:
      return {
        ...state,
        errorsUsers: payload,
      };
    default:
      return state;
  }
};

export default widgetDuck;
