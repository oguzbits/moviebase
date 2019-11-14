import { GET_TV_REVIEWS } from "../../actions/types";

const initialState = {
  loaded: false,
  results: []
};

const getTVReviews = (state = initialState, action) => {
  switch (action.type) {
    case GET_TV_REVIEWS:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default getTVReviews;
