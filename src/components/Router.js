import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  //const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              exact={true}
              path={"/"}
              element={<Home userObj={userObj} />}
            ></Route>
            <Route
              exact={true}
              path={"/profile"}
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            ></Route>
          </>
        ) : (
          <>
            <Route exact={true} path={"/"} element={<Auth />}></Route>
            {/* <Route path="*" element={<Navigate replace to="/" />}></Route> */}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
