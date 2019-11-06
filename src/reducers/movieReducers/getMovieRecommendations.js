import { GET_MOVIE_RECOMMENDATIONS } from "../../actions/types";

const initialState = {
  results: []
};

const getMovieRecommendations = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_RECOMMENDATIONS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getMovieRecommendations;
