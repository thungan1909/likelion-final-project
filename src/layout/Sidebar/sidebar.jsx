import {
  TeamOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenApi from "../../api/authenApi";
import "./sidebar.css";
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const adminItems = [
  getItem("Overview", "1", <HomeOutlined />),
  getItem("User Management", "2", <TeamOutlined />),
  // getItem("Statistic", "3", <BarChartOutlined />),
  getItem("Profile", "4", <UserOutlined />),
  // getItem("Setting", "5", <SettingOutlined />),
  getItem("Logout", "6", <LogoutOutlined />),
];

export default function Sidebar({ userId }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const logoutFun = async () => {
    try {
      AuthenApi.logout(userId);
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      navigate(`/login`, { replace: true });
    } catch (error) {
      // console.log("error");
    }
  };
  const handleLogout = () => {
    logoutFun();
  };
  const handleSwitchCase = (number) => {
    switch (number) {
      case 1:
        navigate("/overview", { replace: true });
        break;
      case 2:
        navigate("/usermanagement", { replace: true });
        break;
      case 3:
        navigate("/statistic", { replace: true });
        break;
      case 4:
        navigate("/profile", { replace: true });
        break;
      case 5:
        navigate("/setting", { replace: true });
        break;
      case 6:
        handleLogout();
        break;
      default:
        navigate("/notfound", { replace: true });
        break;
    }
  };
  const onClick = (e) => {
    handleSwitchCase(parseInt(e.key));
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="dark"
    >
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={adminItems}
        theme="dark"
        style={{ height: "100vh" }}
      />
    </Sider>
  );
}
