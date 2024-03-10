import React from "react";
import { Link } from "react-router-dom";

import "./MenuLinks.css";

const MenuLinks = () => {
  return (
    <React.Fragment>
      <li className="header_links_menu_list">
        <Link to="/main/goods">구매하기</Link>
      </li>
      <li className="header_links_menu_list">
        <Link to="/PurchaseForm">매입신청서</Link>
      </li>
      <li className="header_links_menu_list">
        <Link to="/main/rating">노트북 등급</Link>
      </li>
      <li className="header_links_menu_list">
        <Link to="/main/ratingsystem">등급제</Link>
      </li>
    </React.Fragment>
  );
};

export default MenuLinks;
