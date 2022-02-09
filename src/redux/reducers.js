import { combineReducers } from "redux";
import userDuck from "./ducks/userDuck";
import postDuck from "./ducks/postDuck";

const reducers = combineReducers({
  userDuck,
  postDuck,
});

export default reducers;
