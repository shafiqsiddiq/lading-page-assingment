import React from "react";

const LOGIN = React.lazy(() => import("./Login"));
const SIGN_UP = React.lazy(() => import("./Signup"));
const REGISTER = React.lazy(() => import("./Register"));

const AUTH_PAGES = {
  LOGIN,
  SIGN_UP,
  REGISTER,
};
export default AUTH_PAGES;
