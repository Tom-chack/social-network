import api from "../helpers/api";
import { loadPosts, postError } from "../redux/ducks/postDuck";

const getPosts =
  (query = "", images = false, comments = false) =>
  async (dispatch) => {
    try {
      const postRes = await fetch(`${api}/posts${query}`);
      const postData = await postRes.json();
      if (images) {
        for (let p = 0; p < postData.length; p++) {
          postData[p].image = await getImage(postData[p], dispatch);
        }
      }
      console.log(postData);
      dispatch(loadPosts(postData));
    } catch (e) {
      dispatch(postError(e.message));
    }
  };

async function getImage(post, dispatch) {
  if (post) {
    try {
      let imageRes = await fetch(`${api}/images?postid=${post.id}`);
      let imageData = await imageRes.json();
      return imageData?.url;
    } catch (e) {
      dispatch(postError(e.message));
    }
  }
  return "";
}

export default getPosts;
