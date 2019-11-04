import { GET_MOVIE_EXTERNAL_ID } from "../types";

const saveMovieExternalIDs = payload => ({
  type: GET_MOVIE_EXTERNAL_ID,
  payload
});

const getMovieExternalIDs = url => {
  return dispatch => {
    fetch(url)
      .then(res => res.json())
      .then(data => dispatch(saveMovieExternalIDs(data)))
      .catch(error => console.log(error));
  };
};

export default getMovieExternalIDs;
