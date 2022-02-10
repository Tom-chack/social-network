import api from "../helpers/api";

const getUser = async (id) => {
  try {
    const result = await fetch(`${api}/users/${id}`);
    const user = await result.json();
    if (user) {
      return user;
    } else {
      console.log("user is not found", user);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default getUser;
