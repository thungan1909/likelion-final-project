import jwtDecode from "jwt-decode";
export const checkIsAuthenticated = (token) => {
    if (!token) return false;
  
    const decode = jwtDecode(token);
    const expirationDate = decode.exp;
    const currentTime = Date.now() / 1000;
    if (expirationDate < currentTime) return false;
    return true;
  };

