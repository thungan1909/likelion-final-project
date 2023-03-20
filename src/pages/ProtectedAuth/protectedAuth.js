import { Navigate, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/LayoutContainers/DashboardLayout/dashboardLayout";
import { checkIsAuthenticated } from "../../utils";

function ProtectedAuth({children}){
    const token = localStorage.getItem("access_token");
    const isAuthenticated = token && token.length > 0 ? checkIsAuthenticated(token) : false;
    if(!isAuthenticated){
       
        console.log("Not authenticated");
        return <Navigate to="/login" replace />;
    }
   else{
    return children;
   }
}
export default ProtectedAuth;