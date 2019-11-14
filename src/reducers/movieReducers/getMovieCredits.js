import { GET_MOVIE_CREDITS } from "../../actions/types";

const initialState = {
  loaded: false,
  cast: [],
  crew: []
};

const getMovieCredits = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_CREDITS:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default getMovieCredits;
