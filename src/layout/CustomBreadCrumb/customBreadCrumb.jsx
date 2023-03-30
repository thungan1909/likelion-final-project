import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
const breadcrumbNameMap = {
  "/overview": "Overview",
  "/usermanagement": "User management",
  "/profile": "Profile",
  // "/statictis": "Statictis",
  // "/settings": "Settings",
};
export default function CustomBreadCrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
    };
  });
  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
      key: "home",
    },
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />;
}
