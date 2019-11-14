import { POST_TV_AIRING_TODAY } from "../../actions/types";

const intialState = {
  loaded: false,
  results: []
};

const postTVAiringToday = (state = intialState, action) => {
  switch (action.type) {
    case POST_TV_AIRING_TODAY:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default postTVAiringToday;
