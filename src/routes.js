import DashboardLayout from "./layout/LayoutContainers/DashboardLayout/dashboardLayout";
import EmployeeManagement from "./pages/EmployeeManagement/employeeManagement";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import AdminContext from "./pages/ProtectedAuth/AdminContext";
import ProtectedAuth from "./pages/ProtectedAuth/protectedAuth";
import Register from "./pages/Register/register";
import UserHome from "./pages/UserHome/userHome";

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
    key: "register",
    name: "Register",
    route: "/register",
    component: <Register></Register>,
  },
  {
    key: "home",
    name: "Home",
    route: "/home",
    component: <ProtectedAuth><Home></Home></ProtectedAuth>,
  },
  {
    key: "employee",
    name: "Employee",
    route: "/employee",
    component: <ProtectedAuth><EmployeeManagement></EmployeeManagement></ProtectedAuth>,
  },

];
export default routes;