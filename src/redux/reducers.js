import { combineReducers } from "redux";
import userDuck from "./ducks/userDuck";
import postDuck from "./ducks/postDuck";
import imageDuck from "./ducks/imageDuck";
import commentDuck from "./ducks/commentDuck";


const reducers = combineReducers({
  userDuck,
  postDuck,
  imageDuck,
  commentDuck,
});

export default reducers;
