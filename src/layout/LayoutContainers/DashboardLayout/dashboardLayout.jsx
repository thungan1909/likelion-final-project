import { Layout } from "antd";
import CustomBreadCrumb from "../../CustomBreadCrumb/customBreadCrumb";
import Sidebar from "../../Sidebar/sidebar";

const { Content } = Layout;
export default function DashboardLayout({ children }) {
  return (
    <Layout style={{ width: "100%" }}>
      <Layout className="site-layout">
        <Sidebar></Sidebar>
        <Content style={{ margin: "0 16px" }}>
          <CustomBreadCrumb></CustomBreadCrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
