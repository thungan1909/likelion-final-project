import {
  TeamOutlined,
  HomeOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../api/authApi";
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
  getItem("Employee", "2", <TeamOutlined />),
  getItem("Statistic", "3", <BarChartOutlined />),
  getItem("Profile", "4", <UserOutlined />),
  getItem("Setting", "5", <SettingOutlined />),
  getItem("Logout", "6", <LogoutOutlined />),
];

export default function Sidebar({ userId }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const logoutFun = async () => {
    try {
      const response = await AuthApi.logout(userId);
      // AuthenApi.DeleteSession({ sessionId });
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      navigate(`/login`, { replace: true });
    } catch (error) {
      console.log("error");
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
        navigate("/employee", { replace: true });
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
      theme="light"
    >
      {/* <div
        style={{
          // height: 32,
          margin: 16,
          background: "rgba(255, 255,255, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#2B3674",
        }}
      >
        <div style={{ fontSize: "26px", marginBottom: "16px" }}>
          <span style={{ fontWeight: "bold" }}>Orange</span>
          <span> HRM</span>
        </div>
        <img
          src={ProfileImg}
          style={{ width: "64px", height: "64px", marginBottom: "16px" }}
        ></img>
        <span style={{ fontWeight: "500", fontSize: "16px" }}>
          {user.username}
        </span>
        <span style={{ fontWeight: "400", fontSize: "14px" }}>
          {isAdmin ? "Admin" : "User"}
        </span>
      </div> */}

      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={adminItems}
      />
    </Sider>
  );
}
