import api from "../helpers/api";
import { profileInit, userError } from "../redux/ducks/userDuck";

const getProfile = (id) => (dispatch) => {
  fetch(`${api}/users/${id}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch(profileInit(res));
    })
    .catch((err) => {
      dispatch(userError(err.message));
    });
};

export default getProfile;
