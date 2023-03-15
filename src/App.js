import { ThemeProvider } from "react-bootstrap-v5";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/LayoutContainers/DashboardLayout/dashboardLayout";
import Sidebar from "./layout/Sidebar/sidebar";
import Login from "./pages/Login/login";
import routes from "./routes";

function App() {

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      const token = localStorage.getItem("token");
    
      if (route.route) {
        if (token) {
          return (
            <Route
              exact
              path={route.route}
              element={<DashboardLayout>{route.component}</DashboardLayout>}
              key={route.key}
            ></Route>
          );
        }
        else {
          return (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            ></Route>
          );
        }
      
      }
      return null;
    });

  return (
    <ThemeProvider>
      {/* <Sidebar /> */}
      <BrowserRouter>
        <Routes>{getRoutes(routes)}</Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
