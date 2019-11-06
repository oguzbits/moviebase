import { GET_TV_RECOMMENDATIONS } from "../../actions/types";

const initialState = {
  results: []
};

const getTVRecommendations = (state = initialState, action) => {
  switch (action.type) {
    case GET_TV_RECOMMENDATIONS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getTVRecommendations;
