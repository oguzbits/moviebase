import { POST_MOVIES_UPCOMING } from "../../actions/types";

const initialState = {
  loaded: false,
  results: []
};

const postMoviesUpcoming = (state = initialState, action) => {
  switch (action.type) {
    case POST_MOVIES_UPCOMING:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default postMoviesUpcoming;
