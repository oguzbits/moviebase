import { POST_TV_TOP_RATED } from "../../actions/types";

const initialState = {
  loaded: false,
  results: []
};

const postTVTopRated = (state = initialState, action) => {
  switch (action.type) {
    case POST_TV_TOP_RATED:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default postTVTopRated;
