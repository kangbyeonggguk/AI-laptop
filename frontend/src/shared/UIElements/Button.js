import React, { useEffect } from "react";
import theme from "../util/Theme";

import "./Button.css";

const Button = (props) => {
  useEffect(() => {
    // 테마 설정
    document.documentElement.style.setProperty("--rankColor", theme.primary_100);
    document.documentElement.style.setProperty("--buttonColor", theme.primary_80);
    // 페이지 렌더링 시 맨 위로 스크롤
  }, []);
  return (
    <button className={`button ${props.active ? "active_button" : "inactive_button"} ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
