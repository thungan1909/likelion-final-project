import { Button } from "antd";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminContext from "../ProtectedAuth/AdminContext";
export default function Home() {
  //const { isAdmin } = useContext(AdminContext);
  // console.log("isAdmin", isAdmin);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login", { replace: true });
    // return <Navigate to="/login" replace />;
  };
  return (
    <>
      Home
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}
