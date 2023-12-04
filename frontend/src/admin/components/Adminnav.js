import React from "react";

import "./Adminnav.css";
import { NavLink } from "react-router-dom";

const Adminnav = () => {
  return (
    <div className="adminnav">
      <NavLink to="/admin/userlist" className="adminnav-list">
        유저 리스트
      </NavLink>
      <NavLink to="/admin/paflist" className="adminnav-list">
        매입신청서 리스트
      </NavLink>
      <NavLink to="/admin/notebooklist" className="adminnav-list">
        노트북 리스트
      </NavLink>
    </div>
  );
};

export default Adminnav;
