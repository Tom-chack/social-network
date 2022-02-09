import api from "../helpers/api";
import { loadPosts, postError } from "../redux/ducks/postDuck";

const getPosts =
  (query = "") =>
  (dispatch) => {
    fetch(`${api}/posts${query}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadPosts(res));
      })
      .catch((err) => {
        dispatch(postError(err.message));
      });
  };

export default getPosts;
