import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook"; //api호출 훅 불러오기
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import { useParams } from "react-router-dom";
import { KAKAO_AUTH_URL } from "./Oauth";
import { NAVER_AUTH_URL } from "./Oauthnaver";
import { jwtDecode as jwt_decode } from "jwt-decode";

import "./login.css";

const code = new URL(window.location.href).searchParams.get("code");

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error("리프레시 토큰이 없습니다.");
      return;
    }

    const url = new URL(
      `${process.env.REACT_APP_BACKEND_URL}/accounts/refresh-token`
    );
    url.searchParams.append("refresh_token_key", refreshToken);

    const responseData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token_key: refreshToken }),
    });

    if (responseData.ok) {
      const data = await responseData.json();
      const newAccessToken = data.access_token;

      localStorage.setItem("accessToken", newAccessToken);
    } else {
      console.error("토큰 재발급 요청에 실패했습니다.");
      console.error("응답 상태:", responseData.status);
    }
  } catch (error) {}
};

const Login = () => {
  const { isLoading, sendRequest, clearError } = useHttpClient(); // useHttpClient 훅 사용

  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { code } = useParams();

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

    try {
      const formData = new FormData();
      formData.append("username", id);
      formData.append("password", password);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/accounts/login`,
        "POST",
        formData
      );

      const { access_token, refresh_token, platform_type, admin } =
        responseData;

      const expiresIn = 3600;
      const expirationTime = new Date().getTime() + expiresIn * 1000;

      dispatch(
        loginUser(access_token, refresh_token, platform_type, admin === 1)
      );

      dispatch({
        type: "LOGIN_USER",
        payload: {
          platformType: platform_type,
          isAdmin: admin === true,
        },
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("accessTokenExpiration", expirationTime);

      setError(null);
      navigate("/");
    } catch (error) {
      setError("잘못된 비밀번호입니다. 다시 확인해주세요.");
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
          <a href={KAKAO_AUTH_URL} className="icon_text">
            <img className="icons" src="/img/loginimg/Kakao.png" alt="kakao" />
            <p>카카오톡으로 시작</p>
          </a>
        </div>

        <div className="icon_wrapper">
          <a href={NAVER_AUTH_URL} className="icon_text">
            <img className="icons" src="/img/loginimg/Naver.png" alt="naver" />
            <p>네이버로 시작</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
