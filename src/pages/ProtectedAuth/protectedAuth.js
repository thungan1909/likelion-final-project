import NotFound from "../NotFound/notFound";
function ProtectedAuth({children}){
    const token = localStorage.getItem("access_token");
    const isAuthenticated = token && token.length > 0 ? true : false;
    if(isAuthenticated){
       return children;
    }
   else{
   return (<NotFound/>)
   }
}
export default ProtectedAuth;