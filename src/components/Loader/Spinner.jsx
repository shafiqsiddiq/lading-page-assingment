import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

export default function LoadingSpinner({ size, variant }) {
  return <Spinner animation="border" className="me-2" size={size} variant={variant} />;
}

LoadingSpinner.propTypes = {
  size: PropTypes.node,
  variant: PropTypes.node,
};

LoadingSpinner.defaultProps = {
  size: "md",
  variant: "",
};
