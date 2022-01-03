import errorImage from "./error.jpg";
const ErrorImages = ({ message }) => {
  return (
    <div role="alert">
      <img src={errorImage} alt="sabcat" />
      {message}
    </div>
  );
};
export default ErrorImages;
