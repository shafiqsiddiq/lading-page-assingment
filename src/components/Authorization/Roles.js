import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function Roles({ role, children, fallback }) {
  const { user } = useSelector((store) => store.auth);

  if (user.roles.includes("admin") || user.roles.includes(role))
    return children;

  return fallback;
}

Roles.propTypes = {
  role: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

Roles.defaultProps = {
  fallback: null,
};

export default Roles;
