import React from "react";
import { Link } from "react-router-dom";

import "./MobileNavi.css";

const MobileNavi = () => {
  return (
    <nav className="mobile-navi ">
      <Link to="/purchaseform">
        <img src="/img/navbar/menu1-2.png" className="menu1" alt="menu1" />
      </Link>
      <Link to="/main/rating">
        <img src="/img/navbar/menu2-2.png" className="menu2" alt="menu2" />
      </Link>
      <Link to="/main/ratingsystem">
        <img src="/img/navbar/menu3-2.png" className="menu3" alt="menu3" />
      </Link>
      <Link to="/main/goods">
        <img src="/img/navbar/menu4-2.png" className="menu4" alt="menu4" />
      </Link>
    </nav>
  );
};

export default MobileNavi;
