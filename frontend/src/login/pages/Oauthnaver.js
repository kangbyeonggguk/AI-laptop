const NAVER_CLIENT_ID = "VVPjzaZLMHYFfBStGKMf"; // 발급받은 클라이언트 아이디
const REDIRECT_URI = "http://localhost:3000/authnaver"; // Callback URL
const STATE = "false";

export const NAVER_AUTH_URL = `http://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
