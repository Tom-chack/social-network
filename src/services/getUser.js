import api from "../helpers/api";
import { loginUsers, userError } from "../redux/ducks/userDuck";

const getUsers = (userid) => (dispatch) => {
  fetch(`${api}/users/${userid}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(loginUsers(res));
    })
    .catch((err) => {
      dispatch(userError(err.message));
    });
};

export default getUsers;
