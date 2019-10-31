import { GET_DISCOVER } from "../actions/types";

const initialState = {
  page: "",
  total_results: "",
  total_pages: "",
  results: []
};

const getDiscover = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISCOVER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getDiscover;
