import { combineReducers } from "redux";
import userDuck from "./ducks/userDuck";
import postDuck from "./ducks/postDuck";
import imageDuck from "./ducks/imageDuck";

const reducers = combineReducers({
  userDuck,
  postDuck,
  imageDuck,
});

export default reducers;
