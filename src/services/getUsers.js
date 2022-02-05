import api from "../helpers/api";
import { loadUsers, userError } from "../redux/ducks/userDuck";

const getUsers = () => (dispatch) => {
  fetch(`${api}/users`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(loadUsers(res));
    })
    .catch((err) => {
      dispatch(userError(err.message));
    });
};

export default getUsers;
