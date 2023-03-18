import ProfileImg from "../../assets/img/profile.png";
import {
  TeamOutlined,
  HomeOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import UserApi from "../../api/userApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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
  getItem("Home", "1", <HomeOutlined />),
  getItem("Employee", "2", <TeamOutlined />),
  getItem("Statistic", "3", <BarChartOutlined />),
  getItem("Setting", "4", <SettingOutlined />),
  getItem("Logout", "5", <LogoutOutlined />),
];
const userItems = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("My info", "2", <InfoCircleOutlined />),
  getItem("Logout", "9", <LogoutOutlined />),
];
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
      console.log(response.isAdmin);
      setIsAdmin(response.isAdmin);
    } catch (error) {}
  };
  useEffect(() => {
    getCurrentUser();
  }, [userId]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
    >
      <div
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
      </div>

      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={isAdmin ? adminItems : userItems}
      />
    </Sider>
  );
}
