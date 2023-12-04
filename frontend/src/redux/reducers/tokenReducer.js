import { SET_TOKENS } from "../actions/tokenActions";

const initialState = {
  accessToken: null,
  refreshToken: null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };

    default:
      return state;
  }
};

export default tokenReducer;
