import api from "../helpers/api";
import { postLike, postDislike, postError } from "../redux/ducks/postDuck";

// Like a post ................................
export const likePost = (post) => async (dispatch, getState) => {
  //postLike: {userid, postid}
  let { user } = getState().userDuck;
  let likeData = {
    id: `${user.id}-${post.id}`,
    userid: user.id,
    postid: post.id,
  };
  try {
    let liked = await findLike(likeData);
    if (liked) {
      dispatch(postError("You've already liked this post"));
    } else {
      // Update likes property in the post object
      await fetch(`${api}/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: post.likes + 1, liked: post.liked.push(user.id) }),
      });
      // Add a new like object in the likes array
      const likeRes = await fetch(`${api}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likeData),
      });
      const likedData = await likeRes.json();
      dispatch(postLike(likedData));
    }
  } catch (e) {
    dispatch(postError(e.message));
  }
};

// Dislike a post ................................
export const dislikePost = (post) => async (dispatch, getState) => {
  //postLike: {userid, postid}
  let { user } = getState().userDuck;
  let likeData = {
    id: `${user.id}-${post.id}`,
    userid: user.id,
    postid: post.id,
  };
  try {
    // Update likes property in the post object
    await fetch(`${api}/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: post.likes - 1,
        liked: post.liked.filter((likedUserid) => likedUserid !== user.id),
      }),
    });
    // Add a new like object in the likes array
    await fetch(`${api}/likes/${likeData.id}`, {
      method: "DELETE",
    });
    dispatch(postDislike(likeData));
  } catch (e) {
    dispatch(postError(e.message));
  }
};

//Function to fetch likes by userid
async function findLike({ userid, postid }, dispatch) {
  if (userid && postid) {
    try {
      let likedRes = await fetch(`${api}/likes?userid=${userid}&postid=${postid}`);
      let likedData = await likedRes.json();
      return !!likedData.length;
    } catch (e) {
      dispatch(postError(e.message));
    }
  }
  return false;
}
