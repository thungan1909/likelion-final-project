import jwtDecode from "jwt-decode";
import { createContext } from "react";
const AdminContext = createContext(null);

function MyAdminContext({children}) {
  const token = localStorage.getItem("access_token");
  const decode = jwtDecode(token);

  return <AdminContext.Provider value={decode.isAdmin}>
    {children}
  </AdminContext.Provider>;
}

export default AdminContext;