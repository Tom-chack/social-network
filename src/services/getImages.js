import api from "../helpers/api";
import { loadImages, imageError } from "../redux/ducks/imageDuck";

const getImages =
  (query = "") =>
  (dispatch) => {
    fetch(`${api}/images${query}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadImages(res));
      })
      .catch((err) => {
        dispatch(imageError(err.message));
      });
  };

export default getImages;
