import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook"; //api호출 훅 불러오기
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function AuthPage() {
  //   const location = useLocation();

  const { isLoading, sendRequest, clearError } = useHttpClient(); // useHttpClient 훅 사용

  const dispatch = useDispatch();
  const { code } = useParams();

  useEffect(() => {
    const handleCodeReceived = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      console.log(code);

      if (code) {
        try {
          const formData = new FormData();
          formData.append("oauthcode", code);

          const responseData = await sendRequest(
            "http://127.0.0.1:8000/accounts/login/{sns}",
            "POST",
            formData,
            {
              "Content-Type": "multipart/form-data",
            }
          );

          console.log("Response from backend:", responseData);

          localStorage.setItem("accessToken", responseData.access_token);
          localStorage.setItem("refreshToken", responseData.refresh_token);
        } catch (error) {
          console.error("Error sending code to backend:", error.message);
        }
      }
    };

    handleCodeReceived();
  }, [code, sendRequest]);
}

export default AuthPage;
