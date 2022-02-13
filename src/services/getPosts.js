import api from "../helpers/api";
import { loadPosts, postError } from "../redux/ducks/postDuck";

const getPosts =
  (query = "", user = true, images = true, comments = true) =>
  async (dispatch) => {
    try {
      // Get posts filtered by query
      const postRes = await fetch(`${api}/posts${query}`);
      const postData = await postRes.json();

      // Get post user, image and comments
      for (let i = 0; i < postData.length; i++) {
        if (user) postData[i].user = await getUser(postData[i], dispatch);
        if (images) postData[i].image = await getImage(postData[i], dispatch);
        if (comments) postData[i].comments = await getComments(postData[i], dispatch);
      }

      // Add posts to store state ....................................
      dispatch(loadPosts(postData));
    } catch (e) {
      dispatch(postError(e.message));
    }
  };

//Function to fetch post user by post userid
async function getUser(post, dispatch) {
  if (post) {
    try {
      let userRes = await fetch(`${api}/users?userid=${post.userid}`);
      let userData = await userRes.json();
      return userData[0];
    } catch (e) {
      dispatch(postError(e.message));
    }
  }
  return "";
}

//Function to fetch images by postid
async function getImage(post, dispatch) {
  if (post) {
    try {
      let imageRes = await fetch(`${api}/images?postid=${post.id}`);
      let imageData = await imageRes.json();
      return imageData[0]?.url;
    } catch (e) {
      dispatch(postError(e.message));
    }
  }
  return "";
}

//Function to fetch comments by postid
async function getComments(post, dispatch) {
  if (post) {
    try {
      let commentRes = await fetch(`${api}/comments?postid=${post.id}`);
      let commentData = await commentRes.json();
      return commentData;
    } catch (e) {
      dispatch(postError(e.message));
    }
  }
  return "";
}

export default getPosts;
