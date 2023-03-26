import { Layout } from "antd";
import { useEffect, useState } from "react";
import UserApi from "../../../api/userApi";
import DashboardHeaderSection from "../../../components/section/DashboardHeaderSection/dashboardHeaderSection";
import HeaderSection from "../../../components/section/HeaderSection/headerSection";
import CustomBreadCrumb from "../../CustomBreadCrumb/customBreadCrumb";
import Sidebar from "../../Sidebar/sidebar";

const { Content } = Layout;
export default function DashboardLayout({ children }) {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState("");
  const getCurrentUser = async () => {
    try {
      const response = await UserApi.getUserById(userId);
      setUser(response);
      // setIsAdmin(response.isAdmin);
    } catch (error) {}
  };
  useEffect(() => {
    getCurrentUser();
  }, [userId]);
  return (
    <Layout
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DashboardHeaderSection user={user} />
      <Layout style={{ backgroundColor: "#FFF" }}>
        <Sidebar userId={userId}></Sidebar>
        <Content style={{ margin: "0 16px" }}>
          <CustomBreadCrumb></CustomBreadCrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
