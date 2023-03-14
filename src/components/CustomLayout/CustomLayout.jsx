import { Breadcrumb, Layout } from "antd";
import CustomCard from "../CustomCard/customCard";
import CustomSider from "../CustomSider/customSider";

const { Content } = Layout;

export default function CustomLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomSider></CustomSider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Pages</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ display: "flex" }}>
            <CustomCard></CustomCard>
            <CustomCard></CustomCard>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
