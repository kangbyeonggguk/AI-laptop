import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./Admin.css";

const Adminnav = React.lazy(() => import("../components/Adminnav"));
const Userlist = React.lazy(() => import("./Userlist"));
const Paflist = React.lazy(() => import("./Paflist"));
const NotebookList = React.lazy(() => import("./NotebookList"));
const Salelaptoplist = React.lazy(() => import("./Salelaptoplist"));

const Admin = () => {
  return (
    <React.Fragment>
      <div className="admin">
        <Adminnav />
        <div style={{ marginLeft: "2.0625rem" }}>
          <Routes>
            <Route path="/" exact element={<Navigate to="userlist" />} />
            <Route path="/userlist" exact element={<Userlist />} />
            <Route path="/paflist" exact element={<Paflist />} />
            <Route path="/notebooklist" exact element={<NotebookList />} />
            <Route path="/salelist" exact element={<Salelaptoplist />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
