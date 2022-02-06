import api from "../helpers/api";
import { userRegister, userError } from "../redux/ducks/userDuck";
import { userSchema } from "../helpers/schemas";

const register = (data) => (dispatch) => {
  const userData = { ...userSchema, ...data };

  fetch(`${api}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(userRegister());
    })
    .catch((err) => {
      dispatch(userError(err.message));
    });
};

export default register;
