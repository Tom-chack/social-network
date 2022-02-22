import { combineReducers } from "redux";
import userDuck from "./ducks/userDuck";
import postDuck from "./ducks/postDuck";
import imageDuck from "./ducks/imageDuck";
import commentDuck from "./ducks/commentDuck";
import widgetDuck from "./ducks/widgetDuck";

const reducers = combineReducers({
  userDuck,
  postDuck,
  imageDuck,
  commentDuck,
  widgetDuck,
});

export default reducers;
