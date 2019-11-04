import { GET_TV_EXTERNAL_ID } from "../types";

const saveTVExternalIDs = payload => ({
  type: GET_TV_EXTERNAL_ID,
  payload
});

const getTVExternalIDs = url => {
  return dispatch => {
    fetch(url)
      .then(res => res.json())
      .then(data => dispatch(saveTVExternalIDs(data)))
      .catch(error => console.log(error));
  };
};

export default getTVExternalIDs;
