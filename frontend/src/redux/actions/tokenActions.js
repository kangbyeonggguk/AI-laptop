export const SET_TOKENS = "SET_TOKENS";

export const setTokens = (accessToken, refreshToken) => {
  return {
    type: SET_TOKENS,
    payload: {
      accessToken,
      refreshToken,
    },
  };
};
