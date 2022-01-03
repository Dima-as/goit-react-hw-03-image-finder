import s from "./imageItemGallery.module.scss";
const ImageItemGallery = ({
  id,
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
export default ImageItemGallery;
