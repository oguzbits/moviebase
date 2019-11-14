import { POST_MOVIES_NOWPLAYING } from "../../actions/types";

const initialState = {
  loaded: false,
  results: []
};

const postMoviesNowPlaying = (state = initialState, action) => {
  switch (action.type) {
    case POST_MOVIES_NOWPLAYING:
      return { ...action.payload, loaded: true };
    default:
      return state;
  }
};

export default postMoviesNowPlaying;
