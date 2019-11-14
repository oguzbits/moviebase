import { GET_MOVIE_RECOMMENDATIONS } from "../../actions/types";

const initialState = {
  movieRecommendationsloaded: false,
  results: []
};

const getMovieRecommendations = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_RECOMMENDATIONS:
      return {
        ...state,
        ...action.payload,
        movieRecommendationsloaded: true
      };
    default:
      return state;
  }
};

export default getMovieRecommendations;
