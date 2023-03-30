import DashboardLayout from "./layout/LayoutContainers/DashboardLayout/dashboardLayout";
import AdminDashboard from "./pages/AdminDashboard/adminDashboard";
import UserManagement from "./pages/EmployeeManagement/employeeManagement";

import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Profile from "./pages/Profile/profile";
import ProtectedAdmin from "./pages/ProtectedAuth/protectedAdmin";
import ProtectedAuth from "./pages/ProtectedAuth/protectedAuth";
import Register from "./pages/Register/register";

const routes = [
  {
    key: "default",
    name: "Defaut",
    route: "/",
    component: <Home></Home>,
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
    component: <Home />,
  },
  {
    key: "overview",
    name: "Overview",
    route: "/overview",
    component: 
    (
      <ProtectedAdmin>
        <DashboardLayout>
        <AdminDashboard></AdminDashboard>
        </DashboardLayout>
      </ProtectedAdmin>
    ),
  },
  {
    key: "usermanagement",
    name: "User Management",
    route: "/usermanagement",
    component: (
      <ProtectedAuth>
        <DashboardLayout>
          <UserManagement></UserManagement>
        </DashboardLayout>
      </ProtectedAuth>
    ),
  },
  {
    key: "profile",
    name: "profile",
    route: "/profile",
    component: (
      <ProtectedAuth>
          <Profile />
      </ProtectedAuth>
    ),
  },
];
export default routes;
