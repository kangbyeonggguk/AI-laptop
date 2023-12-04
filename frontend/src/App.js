import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../src/redux/store";

import "./App.css";

import MainNavigation from "./shared/Navigation/MainNavigation";

const Main = React.lazy(() => import("./main/pages/Main"));
const Mypage = React.lazy(() => import("./mypage/pages/Mypage"));
const Admin = React.lazy(() => import("./admin/pages/Admin"));
const Goodsroute = React.lazy(() => import("./goods/pages/Goodsroute"));
const Goods = React.lazy(() => import("./goods/pages/Goods"));
const Goodsview = React.lazy(() => import("./goods/pages/Goodsview"));
const Rating = React.lazy(() => import("./rating/pages/Rating"));
const Ratingsystem = React.lazy(() =>
  import("./ratingsystem/pages/Ratingsystem")
);
const Loading = React.lazy(() => import("./result/pages/Loading"));
const Result = React.lazy(() => {
  return Promise.all([
    import("./result/pages/Result"),
    new Promise((resolve) => setTimeout(resolve, 6000)),
  ]).then(([moduleExports]) => moduleExports);
});
const Process = React.lazy(() => import("./result/pages/Process"));
const Login = React.lazy(() => import("./login/pages/login"));
const Signup = React.lazy(() => import("./signup/pages/Signup"));
const PurchaseForm = React.lazy(() =>
  import("./purchaseform/pages/PurchaseForm")
);

const PrivateRoute = ({ element, path }) => {
  const isAuthenticated = localStorage.getItem("accessToken") !== null;

  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Suspense>
            {/* <Navigate exact from="/" to="/result" /> */}
            <Routes>
              <Route path="/" element={<Navigate to="/main" />} />
              <Route path="/main" exact element={<Main />} />
              <Route
                path="/main/rating"
                element={<PrivateRoute element={<Rating />} />}
              />
              <Route
                path="/main/goods/*"
                element={<PrivateRoute element={<Goodsroute />} />}
              />

              <Route
                path="/admin/*"
                element={<PrivateRoute element={<Admin />} />}
              />
              <Route
                path="/mypage"
                element={<PrivateRoute element={<Mypage />} />}
              />
              <Route
                path="/main/ratingsystem"
                element={<PrivateRoute element={<Ratingsystem />} />}
              />
              <Route path="/loading" element={<Loading />} />
              <Route
                path="/result"
                element={
                  <Suspense fallback={<Loading />}>
                    <Result />
                  </Suspense>
                }
              />
              <Route path="/process" element={<Process />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" exact element={<Signup />} />
              <Route
                path="/purchaseform"
                element={<PrivateRoute element={<PurchaseForm />} />}
              />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
