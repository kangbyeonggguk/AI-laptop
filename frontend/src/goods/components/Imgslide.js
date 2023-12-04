import React, { useState } from "react";

import "./Imgslide.css";

const Imgslide = (props) => {
  const images = props.statusimg;
  const [page, setPage] = useState(0);
  const pageplus = () => {
    if (page < images.length - 4) {
      setPage(page + 1);
    }
  };
  const pageminus = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className="imgslide">
      <img
        src="/img/goodsview/Left.png"
        className="imgslide_arrow"
        alt="leftarrow"
        onClick={pageminus}
      ></img>
      {images.map(
        (image, index) =>
          page + 4 > index &&
          index >= page && (
            <img
              key={index}
              src={image}
              className="imgslide_img"
              alt="imgslideimg"
              onClick={() => {
                props.setMainImg(image);
              }}
            ></img>
          )
      )}
      <img
        src="/img/goodsview/Right.png"
        className="imgslide_arrow"
        alt="leftarrow"
        onClick={pageplus}
      ></img>
    </div>
  );
};

export default Imgslide;
