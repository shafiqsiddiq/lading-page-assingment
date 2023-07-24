import React from "react";

const USERS = React.lazy(() => import("./Users/index"));

const ADMIN_PAGES = {
  USERS,
};
export default ADMIN_PAGES;
