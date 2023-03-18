import { Button } from "antd";

import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  //const { isAdmin } = useContext(AdminContext);
  // console.log("isAdmin", isAdmin);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login", { replace: true });
  };
  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}
