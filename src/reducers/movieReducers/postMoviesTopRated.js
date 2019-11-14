import { POST_MOVIES_TOP_RATED } from "../../actions/types";

const initialState = {
  loaded: false,
  results: []
};

const postMoviesTopRated = (state = initialState, actions) => {
  switch (actions.type) {
    case POST_MOVIES_TOP_RATED:
      return {
        ...state,
        ...actions.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default postMoviesTopRated;
