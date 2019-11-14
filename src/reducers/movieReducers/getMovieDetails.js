import { GET_MOVIE_DETAILS } from "../../actions/types";

const initialState = {
  loaded: false,
  runtime: []
};

const getMovieDetails = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_DETAILS:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default getMovieDetails;
