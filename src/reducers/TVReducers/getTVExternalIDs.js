import { GET_TV_EXTERNAL_ID } from "../../actions/types";

const initialState = {};

const getTVExternalIDs = (state = initialState, action) => {
  switch (action.type) {
    case GET_TV_EXTERNAL_ID:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default getTVExternalIDs;
