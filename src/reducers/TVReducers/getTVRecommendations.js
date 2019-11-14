import { GET_TV_RECOMMENDATIONS } from "../../actions/types";

const initialState = {
  loaded: false,
  results: []
};

const getTVRecommendations = (state = initialState, action) => {
  switch (action.type) {
    case GET_TV_RECOMMENDATIONS:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default getTVRecommendations;
