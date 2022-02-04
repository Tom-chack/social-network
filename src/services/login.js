import api from "../helpers/api";
import { userLogin, userError } from "../redux/ducks/userDuck";

const login = (data) => (dispatch) => {
  fetch(`${api}/users`)
    .then((res) => res.json())
    .then((res) => {
      if (data.username && data.password) {
        const authUser = res.find(
          (user) => user.username === data.username && user.password === data.password
        );
        if (authUser) {
          dispatch(userLogin(authUser));
        } else {
          dispatch(userError("Login Failed!"));
        }
      } else {
        dispatch(userError("Missing username or password"));
      }
    })
    .catch((err) => {
      dispatch(userError(err.message));
    });
};

export default login;
