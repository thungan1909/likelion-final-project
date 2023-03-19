import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";

import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  // const {accessToken, userId} = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if(
  //     accessToken !== localStorage.getItem("access_token") ||
  //     userId !== localStorage.getItem("userId")
  //   ) {
  //     localStorage.setItem("access_token", accessToken);
  //     localStorage.setItem("userId", userId);
  //   }
  // }, [accessToken, userId]);

  const { accessToken, userId } = useSelector((state) => state.auth);
  useEffect(() => {
    if (
      !localStorage.getItem("access_token") ||
      !localStorage.getItem("userId")
    ) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("userId", userId);
    }
  }, [accessToken, userId]);
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          ></Route>
        );
      }
      return null;
    });

  return (
    <BrowserRouter>
        <Routes>{getRoutes(routes)}</Routes>
      </BrowserRouter>
  
  );
}

export default App;
