import { Breadcrumb, Layout } from "antd";
import Sidebar from "../../Sidebar/sidebar";

const { Content } = Layout;
export default function DashboardLayout({ children }) {
  return (
    <Layout style={{ width: "100%" }}>
      <Layout className="site-layout">
        <Sidebar></Sidebar>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Pages</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
