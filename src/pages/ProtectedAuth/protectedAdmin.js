import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { checkIsAuthenticated } from "../../utils";

function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("access_token");
  const decode = jwtDecode(token);
  const isAuthenticated =
    token && token.length > 0 ? checkIsAuthenticated(token) : false;

console.log(decode);
  if (isAuthenticated && decode.isAdmin) {
    return children;
  } else {
    return <Navigate to="/home" replace />;
  }
}
export default ProtectedAdmin;
