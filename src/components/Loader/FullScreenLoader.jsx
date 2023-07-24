import PulseLoader from "react-spinners/PulseLoader";
import PropTypes from "prop-types";

export default function FullScreenLoader({ forRequest }) {
  return (
    <div className={`loaderDiv ${forRequest && "for-request"}`}>
      <div className="spinner">
        <PulseLoader
          color="#1a2065"
          loading="true"
          // cssOverride={override}
          size={15}
        />
      </div>
    </div>
  );
}

FullScreenLoader.propTypes = {
  forRequest: PropTypes.node,
};

FullScreenLoader.defaultProps = {
  forRequest: false,
};
