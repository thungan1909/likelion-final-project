import { ThemeProvider } from "react-bootstrap-v5";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/LayoutContainers/DashboardLayout/dashboardLayout";
import Sidebar from "./layout/Sidebar/sidebar";
import Login from "./pages/Login/login";
import ProtectedAuth from "./pages/ProtectedAuth/protectedAuth";
import routes from "./routes";

function App() {
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
