import DashboardLayout from "./layout/LayoutContainers/DashboardLayout/dashboardLayout";
import AdminDashboard from "./pages/AdminDashboard/adminDashboard";
import EmployeeManagement from "./pages/EmployeeManagement/employeeManagement";
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
    key: "admindashboard",
    name: "Admin dashboard",
    route: "/admindashboard",
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
    key: "employee",
    name: "Employee",
    route: "/employee",
    component: (
      <ProtectedAuth>
        <DashboardLayout>
          <EmployeeManagement></EmployeeManagement>
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
        <DashboardLayout>
          <Profile />
        </DashboardLayout>
      </ProtectedAuth>
    ),
  },
];
export default routes;
