import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode as jwt_decode } from "jwt-decode";

const AuthNaverPage = () => {
  const { isLoading, sendRequest, clearError } = useHttpClient();

  const dispatch = useDispatch();
  const { code } = useParams();
  const navigate = useNavigate();

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

        const expiresIn = 3600;
        const expirationTime = new Date().getTime() + expiresIn * 1000;

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
  };
};

export default AuthNaverPage;
