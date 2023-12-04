import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../redux/actions/userActions";
import { setLoginStatus } from "../../redux/actions/userActions";

import "./MainNavigation.css";
import MenuLinks from "./MenuLinks";
import AuthLinks from "./AuthLinks";
import MobileNavi from "./MobileNavi";

const MainNavigation = ({
  isLoggedIn,
  setLoginStatus,
  loginUser,
  logoutUser,
}) => {
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedIsLoggedIn === "true") {
      setLoginStatus(true);
    }
  }, [setLoginStatus]);

  return (
    <React.Fragment>
      <header className="center header">
        <NavLink to="/main">
          <img src="/img/navbar/logo.png" className="header_logo" alt="logo" />
        </NavLink>
        <nav className="header_menu">
          <ul className="header_menu_links">
            {!isLoggedIn ? null : <MenuLinks />}
          </ul>
        </nav>
        <nav className="header_auth">
          <ul className="header_auth_links center">
            <AuthLinks
              isLoggedIn={isLoggedIn}
              loginUser={loginUser}
              logoutUser={logoutUser}
            />
          </ul>
        </nav>
      </header>
      {isLoggedIn && <MobileNavi />}
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
  setLoginStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
