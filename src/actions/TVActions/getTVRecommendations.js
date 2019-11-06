import { GET_TV_RECOMMENDATIONS } from "../types";

const saveTVRecommendations = payload => ({
  type: GET_TV_RECOMMENDATIONS,
  payload
});

const getTVRecommendations = url => {
  return dispatch => {
    fetch(url)
      .then(res => res.json())
      .then(data => dispatch(saveTVRecommendations(data)))
      .catch(error => console.log(error));
  };
};

export default getTVRecommendations;
