import React from "react";

import "./Adminnav.css";
import { Link } from "react-router-dom";

const Adminnav = () => {
  return (
    <div className="adminnav">
      <Link to="/admin/userlist" className="adminnav-list">
        유저 리스트
      </Link>
      <Link to="/admin/paflist" className="adminnav-list">
        매입신청서 리스트
      </Link>
      <Link to="/admin/notebooklist" className="adminnav-list">
        노트북 리스트
      </Link>
      <Link to="/admin/salelist" className="adminnav-list">
        판매 노트북 리스트
      </Link>
    </div>
  );
};

export default Adminnav;
