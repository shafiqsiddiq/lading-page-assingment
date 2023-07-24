/** @format */

import { Routes, Route } from "react-router-dom";
import WEB_PAGES from "../pages";
import PATH from "./Path.jsx";
import ROUTES from "./Routes.jsx";

function RouterConfig() {
  return (
    <Routes>
      {ROUTES.map((item) => {
        const RouteType = item.routeType;
        return (
          <Route
            key={item.path}
            path={item.path}
            element={<RouteType element={item.page} />}
          />
        );
      })}
      {/* NO PAGE FOUND */}
      <Route path={PATH.NOPAGE} element={<WEB_PAGES.NO_PAGE_FOUND />} />
    </Routes>
  );
}

export default RouterConfig;
