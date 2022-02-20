import { combineReducers } from "redux";
import userDuck from "./ducks/userDuck";
import postDuck from "./ducks/postDuck";
import commentDuck from "./ducks/commentDuck";

const reducers = combineReducers({
  userDuck,
  postDuck,
  commentDuck,
});

export default reducers;
