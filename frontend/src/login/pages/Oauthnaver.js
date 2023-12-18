const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
const STATE = process.env.REACT_APP_NAVER_STATE;

export const NAVER_AUTH_URL = `http://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
