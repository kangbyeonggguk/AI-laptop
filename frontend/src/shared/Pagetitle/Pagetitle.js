import React from "react";
import "./Pagetitle.css";

const Pagetitle = (props) => {
  return (
    <React.Fragment>
      <div className={`pagetitle_title center ${props.className}`}>{props.title}</div>
      <div className={`pagetitle_guide center ${props.className}`}>{props.children}</div>
    </React.Fragment>
  );
};

export default Pagetitle;
