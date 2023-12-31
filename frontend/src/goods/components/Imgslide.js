import React, { useState } from "react";

import "./Imgslide.css";

const Imgslide = (props) => {
  const images = props.statusimg;

  return (
    <div className="imgslide">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className="imgslide_img"
          alt="imgslideimg"
          onClick={() => {
            props.setMainImg(image);
          }}
        ></img>
      ))}
    </div>
  );
};

export default Imgslide;
