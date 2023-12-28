import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

import "./AuthLinks.css";

export const AuthLinks = ({
  isLoggedIn,
  logoutUser,
  platformType,
  isAdmin,
}) => {
  const { isLoading, sendRequest, clearError, setIsLoading } = useHttpClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionTimeout = 120 * 60 * 1000;
  let sessionTimer;

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      if (!refreshToken || !accessToken || !isLoggedIn) {
        return;
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessTokenExpiration");

      const url = new URL(
        `${process.env.REACT_APP_BACKEND_URL}/accounts/logout`
      );
      url.searchParams.append("refresh_token_key", refreshToken);
      const updatedUrl = new URL(url.toString());
      const responseData = await sendRequest(updatedUrl.toString(), "POST");
      await dispatch(logoutUser());

      localStorage.setItem("isLoggedIn", "false");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleUserActivity = () => {
      clearTimeout(sessionTimer);
      if (isLoggedIn) {
        sessionTimer = setTimeout(handleLogout, sessionTimeout);
      }
    };

    const handleBeforeUnload = (event) => {
      const isPageRefresh = !event.clientY;

      if (!isPageRefresh) {
        handleLogout();
      }
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(sessionTimer);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLoggedIn, sessionTimeout]);

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
          {platformType === "R" && !isAdmin && (
            <>
              <li className="header_links_auth_list">
                <NavLink to="/mypage">내 정보 수정</NavLink>
              </li>
              <span className="auth_vector"></span>

              <li className="header_links_auth_list">
                <NavLink to="/main" onClick={handleLogout}>
                  로그아웃
                </NavLink>
              </li>
            </>
          )}

          {["K", "N"].includes(platformType) && !isAdmin && (
            <>
              <li className="header_links_auth_list">
                <NavLink to="/main" onClick={handleLogout}>
                  로그아웃
                </NavLink>
              </li>
            </>
          )}

          {platformType === "R" && isAdmin && (
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
        </>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.login,
    platformType: state.user.platformType,
    isAdmin: state.user.isAdmin,
  };
};

const mapDispatchToProps = {
  loginUser,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLinks);
