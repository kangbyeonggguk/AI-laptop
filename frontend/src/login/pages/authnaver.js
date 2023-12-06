import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook"; //api호출 훅 불러오기
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
            "http://127.0.0.1:8000/accounts/login/naver",
            "POST",
            formData
          );

          console.log("Response from backend:", responseData);

          dispatch({ type: "LOGIN_USER" });

          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("accessToken", responseData.access_token);
          localStorage.setItem("refreshToken", responseData.refresh_token);

          navigate("/");
        } catch (error) {
          console.error("Error sending code to backend:", error.message);
        }
      }
    };

    handleCodeReceived();
  }, []);
  return <></>;
};

export default AuthNaverPage;
