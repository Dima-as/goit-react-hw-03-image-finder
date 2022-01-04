import PropTypes from "prop-types";
import errorImage from "./error.jpg";
const ErrorImages = ({ message }) => {
  return (
    <div role="alert">
      <img src={errorImage} alt="sabcat" />
      {message}
    </div>
  );
};
ErrorImages.propTypes = {
  message: PropTypes.string.isRequired,
};
export default ErrorImages;
