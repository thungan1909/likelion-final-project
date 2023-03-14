import Home from "./pages/Home/home";
import Login from "./pages/Login/login";

const routes = [
  {
    key: "default",
    name: "Defaut",
    route: "/",
    component: <Login></Login>,
  },
  {
    key: "login",
    name: "Login",
    route: "/login",
    component: <Login></Login>,
  },
  {
    key: "home",
    name: "Home",
    route: "/home",
    component: <Home></Home>,
  },
];
export default routes;
