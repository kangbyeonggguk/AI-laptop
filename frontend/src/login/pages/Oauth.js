// OAuth.js 라는 컴포넌트를 따로 생성하여 관리하였음

const CLIENT_ID = "3a8a581619662b5a126943e55dfda42f";
const REDIRECT_URI = "https://localhost:3000/auth";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
