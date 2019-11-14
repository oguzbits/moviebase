import { POST_TV_POPULAR } from "../../actions/types";

const initialState = {
  loaded: false,
  results: []
};

const postTVPopular = (state = initialState, action) => {
  switch (action.type) {
    case POST_TV_POPULAR:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default postTVPopular;
