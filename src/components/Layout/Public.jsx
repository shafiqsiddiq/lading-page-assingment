import PropTypes from "prop-types";

function Public({ children }) {
  return <div className="vh-100">{children}</div>;
}
Public.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Public;
