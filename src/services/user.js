import api from "../helpers/api";
import { userUpdate, userError } from "../redux/ducks/userDuck";

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
