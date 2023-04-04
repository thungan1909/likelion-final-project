import Home from "../Home/home";
function NavigateAuth({children}){
    const token = localStorage.getItem("access_token");
    const isAuthenticated = token && token.length > 0 ? true : false;
    if(!isAuthenticated){
       return children;
    }
   else{
   return <Home/>
   }
}
export default NavigateAuth;