import DashboardLayout from "./layout/LayoutContainers/DashboardLayout/dashboardLayout";
import AdminDashboard from "./pages/AdminDashboard/adminDashboard";
import ComingSoon from "./pages/ComingSoon/comingSoon";
import UserManagement from "./pages/EmployeeManagement/employeeManagement";

import Home from "./pages/Home/home";
import IdeaDetail from "./pages/IdeaDetail/ideaDetail";
import Login from "./pages/Login/login";
import MyIdeas from "./pages/MyIdeas/myIdeas";
import MyLikes from "./pages/MyLikes/myLikes";
import NotFound from "./pages/NotFound/notFound";
import Profile from "./pages/Profile/profile";
import NavigateAuth from "./pages/ProtectedAuth/navigateAuth";
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
    component: <NavigateAuth><Login/></NavigateAuth>,
  },
  {
    key: "register",
    name: "Register",
    route: "/register",
    component: <NavigateAuth><Register></Register></NavigateAuth>,
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
    component: (
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
      <ProtectedAdmin>
        <DashboardLayout>
          <UserManagement></UserManagement>
        </DashboardLayout>
      </ProtectedAdmin>
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
  {
    key: "myideas",
    name: "My ideas",
    route: "/myideas",
    component: (
      <ProtectedAuth>
        <MyIdeas />
      </ProtectedAuth>
    ),
  },
  {
    key: "mylikes",
    name: "My likes",
    route: "/mylikes",
    component: (
      <ProtectedAuth>
        <ComingSoon/>
      </ProtectedAuth>
    ),
  },
  {
    key: "settings",
    name: "Settings",
    route: "/settings",
    component: (
      <ProtectedAuth>
        <ComingSoon/>
      </ProtectedAuth>
    ),
  },
  {
    key: "idea-detail",
    name: "Idea detail",
    route: "/detail/:id",
    component: <IdeaDetail />,
  },
  {
    key: "notFound",
    name: "Not found",
    route: "*",
    component: <NotFound />,
  },
];
export default routes;
