import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
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
