import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook"; //api호출
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

import "./AuthLinks.css";

const AuthLinks = ({ isLoggedIn, logoutUser }) => {
  const { isLoading, sendRequest, clearError, setIsLoading } = useHttpClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      // const accessToken = localStorage.getItem("accessToken");

      if (refreshToken) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessTokenExpiration");

        const url = new URL("http://127.0.0.1:8000/accounts/logout");
        url.searchParams.append("refresh_token_key", refreshToken);
        // url.searchParams.append("refresh_token_key", accessToken);

        const responseData = await sendRequest(url.toString(), "POST");

        navigate("/");
      }
      dispatch(logoutUser());
      localStorage.setItem("isLoggedIn", "false");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <React.Fragment>
      {!isLoggedIn ? (
        <>
          <li className="header_links_auth_list">
            <NavLink to="/signup">회원가입</NavLink>
          </li>
          <span className="auth_vector"></span>
          <li className="header_links_auth_list">
            <NavLink to="/login">로그인</NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="header_links_auth_list">
            <NavLink to="/mypage">내 정보 수정</NavLink>
          </li>
          <span className="auth_vector"></span>
          <li className="header_links_auth_list">
            <NavLink to="/admin">관리자</NavLink>
          </li>
          <span className="auth_vector"></span>
          <li className="header_links_auth_list">
            <NavLink to="/main" onClick={handleLogout}>
              로그아웃
            </NavLink>
          </li>
        </>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.login,
  };
};

const mapDispatchToProps = {
  loginUser,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLinks);
