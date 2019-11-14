import { POST_MOVIES_POPULAR } from "../../actions/types";

const initialState = {
  loaded: false,
  results: []
};

const postMoviesPopular = (state = initialState, action) => {
  switch (action.type) {
    case POST_MOVIES_POPULAR:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default postMoviesPopular;
