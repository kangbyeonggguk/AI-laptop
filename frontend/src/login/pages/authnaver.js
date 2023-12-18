import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook"; //api호출 훅 불러오기
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode as jwt_decode } from "jwt-decode";

const AuthNaverPage = () => {
  //   const location = useLocation();

  const { isLoading, sendRequest, clearError } = useHttpClient(); // useHttpClient 훅 사용

  const dispatch = useDispatch();
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCodeReceived = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      console.log(code);

      if (code) {
        try {
          const formData = new FormData();
          formData.append("oauthcode", code);

          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/accounts/login/naver`,
            "POST",
            formData
          );

          const { platform_type, admin } = responseData;

          console.log("Response from backend:", responseData);

          const expires_in = 9;
          const expirationTime = Date.now() * expires_in;

          dispatch({
            type: "LOGIN_USER",
            payload: {
              platformType: platform_type,
              isAdmin: admin === true,
            },
          });

          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("accessToken", responseData.access_token);
          localStorage.setItem("refreshToken", responseData.refresh_token);
          localStorage.setItem("accessTokenExpiration", expirationTime);

          navigate("/");
        } catch (error) {
          console.error("Error sending code to backend:", error.message);
        }
      }

      // 액세스 토큰 만료 여부 확인
      function isAccessTokenExpired(accessToken) {
        // JWT 라이브러리를 사용하여 액세스 토큰 디코딩
        const decodedToken = jwt_decode(accessToken);
        // 디코딩된 토큰에서 만료 시간을 추출
        const expirationTime = decodedToken.exp;
        // 현재 시간을 밀리초 단위로 얻은 후, 초 단위로 변환
        const currentTime = Math.floor(Date.now() / 1000);
        // 만료 시간이 현재 시간보다 작으면 토큰은 만료된 것으로 간주
        return expirationTime < currentTime;
      }

      async function refreshAccessToken() {
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
            console.log("토큰 재발급 성공!", newAccessToken);
          } else {
            console.error("토큰 재발급 요청에 실패했습니다.");
            console.error("응답 상태:", responseData.status);
          }
        } catch (error) {
          console.error("토큰 재발급 요청 중 오류가 발생했습니다.", error);
        }
      }

      async function performTokenRefresh() {
        if (isAccessTokenExpired(localStorage.getItem("accessToken"))) {
          // 액세스 토큰이 만료되었을 때 리프레시 토큰으로 갱신
          await refreshAccessToken();
        }
      }

      setTimeout(performTokenRefresh, 60 * 60 * 1000);
    };

    handleCodeReceived();
  }, []);
  return <></>;
};

export default AuthNaverPage;
