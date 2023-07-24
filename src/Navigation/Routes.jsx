import WEB_PAGES from "../pages";
import PATH from "./Path";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";

const AUTH_ROUTES = [
  // {
  //   name: "Login",
  //   path: PATH.LOGIN,
  //   page: <WEB_PAGES.AUTH_PAGES.LOGIN />,
  //   routeType: PublicRoute,
  // },
  {
    name: "Login",
    path: PATH.LOGIN,
    page: <WEB_PAGES.AUTH_PAGES.LOGIN />,
    routeType: PublicRoute,
  },
  {
    name: "Signup",
    path: PATH.SIGN_UP,
    page: <WEB_PAGES.AUTH_PAGES.SIGN_UP />,
    routeType: PublicRoute,
  },
];
const CLIENT_ROUTES = [
  {
    name: "Landing Page",
    path: PATH.LANDING_PAGE,
    page: <WEB_PAGES.LANDING_PAGE />,
    routeType: PublicRoute,
  },
  {
    name: "Client Dashboard",
    path: PATH.CLIENT_DASHBOARD,
    page: <WEB_PAGES.CLIENT_PAGES.DASHBOARD />,
    routeType: ProtectedRoute,
  },
];

const SHARED_ROUTES = [];

const ROUTES = [...AUTH_ROUTES, ...CLIENT_ROUTES, ...SHARED_ROUTES];

export default ROUTES;
