import { ThemeProvider } from "react-bootstrap-v5";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/LayoutContainers/DashboardLayout/dashboardLayout";
import Sidebar from "./layout/Sidebar/sidebar";
import Login from "./pages/Login/login";
import ProtectedAuth from "./pages/ProtectedAuth/protectedAuth";
import routes from "./routes";

import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const {accessToken, userId} = useSelector((state) => state.auth);
  useEffect(() => {
    if(
      !localStorage.getItem("access_token") ||
      !localStorage.getItem("userId")
    ) {
      console.log("access_token", accessToken);
      console.log("userId", userId);
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
