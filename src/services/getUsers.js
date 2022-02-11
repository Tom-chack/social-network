import api from "../helpers/api";
import { loadUsers, userError } from "../redux/ducks/userDuck";

const getUsers =
  (query = "") =>
  (dispatch) => {
    fetch(`${api}/users${query}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        dispatch(loadUsers(res));
      })
      .catch((err) => {
        dispatch(userError(err.message));
      });
  };

export default getUsers;
