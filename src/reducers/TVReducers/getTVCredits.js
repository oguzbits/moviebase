import { GET_TV_CREDITS } from "../../actions/types";

const initialState = {
  loaded: false,
  cast: [],
  crew: []
};

const getTVCredits = (state = initialState, action) => {
  switch (action.type) {
    case GET_TV_CREDITS:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default getTVCredits;
