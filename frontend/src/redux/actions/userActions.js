import { setTokens } from "./tokenActions";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";

export const loginUser = (accessToken, refreshToken) => {
  return (dispatch) => {
    dispatch(setTokens(accessToken, refreshToken));
    dispatch({
      type: "LOGIN_USER",
    });
  };
};

export const logoutUser = () => {
  return { type: "LOGOUT_USER" };
};

export const setLoginStatus = (isLoggedIn) => {
  return {
    type: SET_LOGIN_STATUS,
    isLoggedIn,
  };
};
