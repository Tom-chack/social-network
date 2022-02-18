import api from "../helpers/api";
import { loadPosts, postError } from "../redux/ducks/postDuck";

const getPosts =
  (query = "", user = true, images = true, comments = true) =>
  async (dispatch) => {
    try {
      // Get posts filtered by query
      let postRes = await fetch(`${api}/posts${query}`);
      let postData = await postRes.json();

      // Get post user, image and comments
      for (let i = 0; i < postData.length; i++) {
        if (user) postData[i].user = await getUser(postData[i].userid, dispatch);
        if (images) postData[i].image = await getImage(postData[i], dispatch);
        if (comments) postData[i].comments = await getComments(postData[i], dispatch);
      }

      //Favored posts by user id .....................................
      if (query) {
        const urlSearchParams = new URLSearchParams(query);
        const params = Object.fromEntries(urlSearchParams.entries());
        if ("favoredby" in params) {
          let likes = await getLikes(params.favoredby);
          let likedPosts = likes.map((like) => like.postid);
          postData = postData.filter((post) => likedPosts.includes(post.id));
        }
      }

      // Add posts to store state ....................................
      dispatch(loadPosts(postData));
    } catch (e) {
      dispatch(postError(e.message));
    }
  };

//Function to fetch post user by post userid
async function getUser(userid, dispatch) {
  if (userid) {
    try {
      let userRes = await fetch(`${api}/users?id=${userid}`);
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
      // Get post user
      for (let i = 0; i < commentData.length; i++) {
        commentData[i].user = await getUser(commentData[i].userid, dispatch);
      }
      return commentData;
    } catch (e) {
      dispatch(postError(e.message));
    }
  }
  return "";
}

//Function to fetch likes by userid
async function getLikes(userid, dispatch) {
  if (userid) {
    try {
      let likeRes = await fetch(`${api}/likes?userid=${userid}`);
      let likeData = await likeRes.json();
      return likeData;
    } catch (e) {
      dispatch(postError(e.message));
    }
  }
  return "";
}

export default getPosts;
