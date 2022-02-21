import api from "../helpers/api";
import { userUpdate, userError } from "../redux/ducks/userDuck";

// Update user by id ..............................
export const updateUser = (data) => (dispatch) => {
  if (data.id) {
    fetch(`${api}/users/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(userUpdate(data));
      })
      .catch((err) => {
        dispatch(userError(err.message));
      });
  } else {
    dispatch(userError("User is not found"));
  }
};