import { POST_TV_ON_THE_AIR } from "../../actions/types";

const initialState = {
  loaded: false,
  results: []
};

const postTVOnTheAir = (state = initialState, action) => {
  switch (action.type) {
    case POST_TV_ON_THE_AIR:
      return {
        ...state,
        ...action.payload,
        loaded: true
      };
    default:
      return state;
  }
};

export default postTVOnTheAir;
