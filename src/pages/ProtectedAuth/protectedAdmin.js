import jwtDecode from "jwt-decode";
import NotFound from "../NotFound/notFound";

function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("access_token");

  const isAuthenticated =
    token && token.length > 0 ? true : false;
    console.log(isAuthenticated);
    if (isAuthenticated) 
    {  
       const decode = jwtDecode(token);
        if (decode.isAdmin)
        {
          return children;
        }
    }
    return (<NotFound/>)
 
}
export default ProtectedAdmin;
