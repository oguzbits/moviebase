import { GET_MOVIE_REVIEWS } from "../../actions/types";

const initialState = {
  loaded: false,
  results: []
};

const getMovieReviews = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_REVIEWS:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default getMovieReviews;
