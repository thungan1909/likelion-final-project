import Login from "./pages/Login/login";

const routes = [
    {
        key: 'default',
        name: 'Defaut',
        route: '/',
        component: <Login></Login>
    },
    {
    key: 'login',
    name: 'Login',
    route: '/login',
    component: <Login></Login>
}];
export default routes;