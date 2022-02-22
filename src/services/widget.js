import api from "../helpers/api";
import { loadUsers, usersError } from "../redux/ducks/widgetDuck";

const getUsers =
  (query = "") =>
  (dispatch) => {
    fetch(`${api}/users${query}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadUsers(res));
      })
      .catch((err) => {
        dispatch(usersError(err.message));
      });
  };

export default getUsers;
