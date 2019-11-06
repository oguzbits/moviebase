import { GET_MOVIE_RECOMMENDATIONS } from "../types.js";

const saveMovieRecommendations = payload => ({
  type: GET_MOVIE_RECOMMENDATIONS,
  payload
});

const getMovieRecommendations = url => {
  return dispatch => {
    fetch(url)
      .then(res => res.json())
      .then(data => dispatch(saveMovieRecommendations(data)))
      .catch(error => console.log(error));
  };
};

export default getMovieRecommendations;
