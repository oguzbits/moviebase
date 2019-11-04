import { GET_MOVIE_EXTERNAL_ID } from "../../actions/types";

const initialState = {};

const getMovieExternalIDs = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_EXTERNAL_ID:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getMovieExternalIDs;
