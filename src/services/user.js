import api from "../helpers/api";
import { userUpdate, userError } from "../redux/ducks/userDuck";
import getUser from "./getUser";

// Update user by id ..............................
export const updateUser = (userData) => (dispatch) => {
  if (userData.id) {
    fetch(`${api}/users/${userData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((user) => {
        dispatch(userUpdate(user));
      })
      .catch((err) => {
        dispatch(userError(err.message));
      });
  } else {
    dispatch(userError("User is not found"));
  }
};

export const addFriend = (profile) => async (dispatch, getState) => {
  let { user } = getState().userDuck;
  try {
    let currentUser = await getUser(user.id);
    if (profile.id && currentUser.id) {
      // Add friend information to current profile..........................
      let profileFriends = [...new Set([...profile.friends, currentUser.id])];
      await fetch(`${api}/users/${profile.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friends: profileFriends }),
      });
      dispatch(userUpdate({ friends: profileFriends, id: profile.id }));

      // Add friend information to current user..........................
      let userFriends = [...new Set([...currentUser.friends, profile.id])];
      await fetch(`${api}/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friends: userFriends }),
      });
      dispatch(userUpdate({ friends: userFriends, id: currentUser.id }));
    } else {
      dispatch(userError("User is not found"));
    }
  } catch (err) {
    dispatch(userError(err.message));
  }
};

export const removeFriend = (profile) => async (dispatch, getState) => {
  let { user } = getState().userDuck;
  try {
    let currentUser = await getUser(user.id);
    if (profile.id && currentUser.id) {
      // Add friend information to current profile..........................
      let profileFriends = [...profile.friends.filter((friendId) => friendId !== currentUser.id)];
      await fetch(`${api}/users/${profile.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friends: profileFriends,
        }),
      });
      dispatch(userUpdate({ friends: profileFriends, id: profile.id }));

      // Add friend information to current user..........................
      let userFriends = [...currentUser.friends.filter((friendId) => friendId !== profile.id)];
      await fetch(`${api}/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friends: userFriends,
        }),
      });
      dispatch(userUpdate({ friends: userFriends, id: currentUser.id }));
    } else {
      dispatch(userError("User is not found"));
    }
  } catch (err) {
    dispatch(userError(err.message));
  }
};
