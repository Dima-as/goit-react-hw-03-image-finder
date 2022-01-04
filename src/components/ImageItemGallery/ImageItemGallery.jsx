import PropTypes from "prop-types";
import s from "./imageItemGallery.module.scss";
const ImageItemGallery = ({
  webformatURL,
  largeImageURL,
  tags,
  handleImageClick,
}) => {
  return (
    <>
      <li className={s.galleryItem}>
        <img
          width="100%"
          src={webformatURL}
          alt={tags}
          datasrc={largeImageURL}
          onClick={() => {
            handleImageClick(largeImageURL, tags);
          }}
        />
      </li>
    </>
  );
};
ImageItemGallery.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func,
};
export default ImageItemGallery;
