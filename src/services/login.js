import api from '../helpers/api'
import { userLogin, userError } from '../redux/ducks/userDuck'

const login = (data) => (dispatch) => {
  console.log(data)
  fetch(`${api}/users`)
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem('_user', JSON.stringify(res))
      dispatch(userLogin(res))
    })
    .catch((err) => {
      dispatch(userError(err.message))
    })
}

export default login
