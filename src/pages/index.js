// import React from "react";
import NoPageFound from "./NoPageFound";
import AUTH_PAGES from "./Auth";
import CLIENT_PAGES from "./Client";
import LANDING_PAGE from "./LandingPage/index.jsx";
// const LANDING_PAGE = React.lazy(() => import("./LandingPage"));

const WEB_PAGES = {
  AUTH_PAGES,
  CLIENT_PAGES,
  LANDING_PAGE,
  // Mo page found
  NO_PAGE_FOUND: NoPageFound,
};
export default WEB_PAGES;
