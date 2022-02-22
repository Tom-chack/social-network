import { imageSchema } from "../../helpers/schemas";

// Action Types
const LOAD_IMAGES = "image/LOAD_IMAGE";
const IMAGE_ERROR = "image/IMAGE_ERROR";

// Actions
export const loadImages = (payload) => ({ type: LOAD_IMAGES, payload });
export const imageError = (payload) => ({ type: IMAGE_ERROR, payload });

// Initial State of the postDuck
const initialState = {
    image: { ...imageSchema, id: 0 },
    images: [],
    errorsImage: "",
  };


// imageDuck Reducer
const imageDuck = (state = initialState, { type, payload }) => {
    switch (type) {
      case LOAD_IMAGES:
        return {
          ...state,
          images: payload,
        };
      case IMAGE_ERROR:
        return {
          ...state,
          errorsImage: payload,
        };
      default:
        return state;
    }
  };
  
  export default imageDuck;