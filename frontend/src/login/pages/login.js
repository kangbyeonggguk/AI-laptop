import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook"; //api호출 훅 불러오기
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

import "./login.css";

const Rest_api_key = "3a8a581619662b5a126943e55dfda42f"; // REST API KEY
const redirect_uri = "http://localhost:3000/auth"; // Redirect URI
// OAuth 요청 URL
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${`3a8a581619662b5a126943e55dfda42f`}&redirect_uri=${`https://localhost:3000/auth`}&response_type=code`;

const kakaoHandleLogin = () => {
  window.location.href = kakaoURL;
};

const code = new URL(window.location.href).searchParams.get("code");
console.log(code);

const NAVER_CLIENT_ID = "VVPjzaZLMHYFfBStGKMf"; // 발급받은 클라이언트 아이디
const REDIRECT_URI = "http://localhost:3000/auth"; // Callback URL
const STATE = "False";
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${`VVPjzaZLMHYFfBStGKMf`}&state=${`False`}&redirect_uri=${`https://localhost:3000/auth`}`;

const naverHandleLogin = () => {
  window.location.href = NAVER_AUTH_URL;
};

const Login = () => {
  const { isLoading, sendRequest, clearError } = useHttpClient(); // useHttpClient 훅 사용

  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Enter 키를 누르면 handleLogin 함수 호출
      handleLogin();
    }
  };
  const handleLogin = async () => {
    if (!id || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    console.log("로그인 시도:", id, password);

    try {
      const formData = new FormData();
      formData.append("username", id);
      formData.append("password", password);
      const responseData = await sendRequest(
        "http://127.0.0.1:8000/accounts/login",
        "POST",
        formData
      );

      const { access_token, refresh_token } = responseData;
      // 토큰 갱신을 위한 타이머 설정 함수
      const checkTokenExpiration = () => {
        const expirationTime = localStorage.getItem("accessTokenExpiration");
        if (expirationTime) {
          const now = new Date();
          const expiration = new Date(expirationTime);
          const timeUntilExpiration = expiration - now;

          // 만료 시간 5분 전에 갱신
          const refreshTime = 5 * 60 * 1000;
          if (timeUntilExpiration < refreshTime) {
            // 만료 5분 전이면 토큰 갱신
            refreshAccessToken();
          }
        }
      };

      const expires_in = 3600;

      const expirationTime = Date.now() + expires_in * 1000;

      dispatch({ type: "LOGIN_USER" });

      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("accessTokenExpiration", expirationTime);

      console.log(responseData.access_token);

      setError(null);
      navigate("/");
    } catch (error) {
      setError("잘못된 비밀번호입니다. 다시 확인해주세요.");
    }
  };

  const refreshAccessToken = async (refreshTokenKey) => {
    try {
      if (!refreshTokenKey) {
        console.error("refreshTokenKey가 비어있거나 전달되지 않았습니다.");
        return;
      }

      const accessToken = localStorage.getItem("accessToken");
      const expirationTime = localStorage.getItem("accessTokenExpiration");

      if (!accessToken || !expirationTime) {
        console.error("저장된 액세스 토큰 또는 만료 시간이 없습니다.");
        return;
      }

      // 만료 시간이 현재 시간보다 이전이라면 토큰을 갱신
      const isTokenExpired = new Date(expirationTime) < new Date();

      if (isTokenExpired) {
        const url = new URL("http://127.0.0.1:8000/accounts/refresh-token");
        url.searchParams.append("refresh_token_key", refreshTokenKey);

        const responseData = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (responseData.ok) {
          const data = await responseData.json();
          const newAccessToken = data.access_token;

          localStorage.setItem("accessToken", newAccessToken);
          console.log("토큰 재발급 성공!", newAccessToken);
        } else {
          console.error("토큰 재발급 요청에 실패했습니다.");
          console.error("응답 상태:", responseData.status);
        }
      }
    } catch (error) {
      console.error("토큰 재발급 요청 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-page">
      <img className="welcome" src="/img/loginimg/Welcome.png" alt="Welcome" />
      <p className="text_welcome">환영합니다!</p>
      <form className="login-form">
        <input
          type="text"
          value={id}
          onChange={(e) => setID(e.target.value)}
          className="login-input"
          onKeyPress={handleKeyPress}
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={error ? "error-input" : "login-input"}
          onKeyPress={handleKeyPress}
        />
        {error && <p className="error-message">{error}</p>}
        <button
          type="button"
          onKeyPress={handleKeyPress}
          className="login-button"
          onClick={handleLogin}
        >
          로그인하기
        </button>
        <div className="nosignup">
          <p>아직 회원이 아니세요?</p>
          <p>
            <Link to="/Signup" className="signup">
              회원가입하기
            </Link>
          </p>
        </div>
      </form>
      <div className="icon_content">
        <div className="icon_wrapper">
          <Link className="icon_text" onClick={kakaoHandleLogin}>
            <img className="icons" src="/img/loginimg/Kakao.png" alt="kakao" />
            <p>카카오톡으로 시작</p>
          </Link>
        </div>

        <div className="icon_wrapper">
          <Link className="icon_text" onClick={naverHandleLogin}>
            <img className="icons" src="/img/loginimg/Naver.png" alt="naver" />
            <p>네이버로 시작</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
