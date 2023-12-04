import React from "react";

import "./Ratinginfo.css";

const Ratinginfo = (props) => {
  return (
    <React.Fragment>
      <div
        className="ratingsystem_rating"
        style={{ border: `solid 1px ${props.color}` }}
      >
        <div
          className="ratingsystem_rating_title center"
          style={{
            backgroundColor: `${props.backgroundColor}`,
            borderBottom: `solid 1px ${props.color}`,
            color: `${props.fontcolor}`,
          }}
        >
          {props.rating}등급
        </div>
        <div className="ratingsystem_rating_des">
          <img
            className="ratingsystem_rating_des_img"
            src={`/img/Ratingsystem/${props.rating}.png`}
            alt="Ratingimage"
          ></img>
          <div className="ratingsystem_rating_des_text">
            파손도 총합{" "}
            <a style={{ color: `${props.color}` }}>{props.percent}%</a> 미만
          </div>
          <div className="ratingsystem_rating_des_text2 center">
            파손 정도가 가장 낮은
            <br /> 고품질의 등급!
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Ratinginfo;
