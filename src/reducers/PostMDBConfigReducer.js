import { POST_MDB_CONFIG } from "../actions/types";

const initialState = {
  apiKey: "b862a3dded810c99c1b80063e778119b"
};

const PostMDBConfig = (state = initialState, action) => {
  switch (action.type) {
    case POST_MDB_CONFIG:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default PostMDBConfig;
