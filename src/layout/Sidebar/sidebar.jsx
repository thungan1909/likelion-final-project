import ProfileImg from "../../assets/img/profile.png";
import {
  TeamOutlined,
  HomeOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Employee", "2", <TeamOutlined />),
  getItem("Statistic", "sub1", <BarChartOutlined />),
  getItem("Setting", "sub2", <SettingOutlined />),
  getItem("Logout", "9", <LogoutOutlined />),
];
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
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
        <span style={{ fontWeight: "500", fontSize: "24px" }}>Admin</span>
        <span style={{ fontWeight: "400", fontSize: "16px" }}>Admin</span>
      </div>

      <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
    </Sider>
  );
}
