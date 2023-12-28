import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

import { store, persistor } from "../src/redux/store";

import "./App.css";

import MainNavigation from "./shared/Navigation/MainNavigation";

import AuthPage from "./login/pages/auth";
import AuthNaverPage from "./login/pages/authnaver";
import { logoutUser } from "./redux/actions/userActions";

import { refreshAccessToken } from "./login/pages/login";
import { handleLogout } from "./shared/Navigation/AuthLinks";

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

const MypageRoute = ({ element, path }) => {
  const isAuthenticated = localStorage.getItem("accessToken") !== null;
  const platformType = useSelector((state) => state.user.platformType);

  if (isAuthenticated) {
    if (platformType === "R") {
      return element;
    } else {
      return alert("접근 권한이 없습니다.");
    }
  } else {
    return <Navigate to="/login" />;
  }
};

const AdminRoute = ({ element, path }) => {
  const isAuthenticated = localStorage.getItem("accessToken") !== null;
  const isAdmin = useSelector((state) => state.user.isAdmin);

  if (isAuthenticated) {
    if (isAdmin) {
      return element;
    } else {
      return alert("접근 권한이 없습니다.");
    }
  } else {
    return <Navigate to="/login" />;
  }
};

const PrivateRoute = ({ element, path }) => {
  const isAuthenticated = localStorage.getItem("accessToken") !== null;

  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkTokenExpiration = () => {
      const accessTokenExpiration = localStorage.getItem(
        "accessTokenExpiration"
      );

      if (accessTokenExpiration) {
        const expirationTime = new Date(
          Number(accessTokenExpiration)
        ).getTime();

        const currentTime = new Date().getTime();

        const timeDifference = expirationTime - currentTime;

        if (timeDifference >= 0 && timeDifference <= 2 * 60 * 60 * 1000) {
          if (timeDifference <= 1 * 60 * 1000) {
            refreshAccessToken();
          }
        } else if (timeDifference <= 0) {
          dispatch(logoutUser());
          localStorage.clear();
          localStorage.setItem("isLoggedIn", "false");
        }
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);
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
                element={<AdminRoute element={<Admin />} />}
              />
              <Route
                path="/mypage"
                element={<MypageRoute element={<Mypage />} />}
              />
              <Route
                path="/main/ratingsystem"
                element={<PrivateRoute element={<Ratingsystem />} />}
              />
              <Route path="/loading" element={<Loading />} />
              <Route path="/result" element={<Result />} />

              <Route path="/process" element={<Process />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" exact element={<Signup />} />
              <Route
                path="/purchaseform"
                element={<PrivateRoute element={<PurchaseForm />} />}
              />
              <Route exact path="/auth" Component={AuthPage} />
              <Route exact path="/authnaver" Component={AuthNaverPage} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
