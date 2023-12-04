import { SET_LOGIN_STATUS } from "../actions/userActions";

const initialState = {
  login: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        login: true,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        login: false,
      };
    case SET_LOGIN_STATUS:
      return {
        ...state,
        login: action.isLoggedIn,
      };

    case "SET_TOKENS":
      return state;
    default:
      return state;
  }
};

export default userReducer;
