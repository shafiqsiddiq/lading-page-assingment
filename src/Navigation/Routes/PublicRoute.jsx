import { useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Public from "../../components/Layout/Public";
import FullScreenLoader from "../../components/Loader/FullScreenLoader";
// import LOOKUP from "../../utils/lookup";
import PATH from "../Path";

function PublicRoute({ element }) {
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      debugger;
      window.location.href = PATH.CLIENT_DASHBOARD;
    }
  }, [user]);

  if (user === undefined) return <FullScreenLoader />;

  return <Public>{element}</Public>;
}

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PublicRoute;
