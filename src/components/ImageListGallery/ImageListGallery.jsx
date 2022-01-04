import { Component } from "react";
import PropTypes from "prop-types";
import ImageItemGallery from "../ImageItemGallery/ImageItemGallery";
import Modal from "../Modal/Modal";
import s from "./ImageListGallery.module.scss";
import Loaders from "../Loader/Loader";

class ImageListGallery extends Component {
  state = {
    largeImageURL: "",
    tags: "",
    showModal: false,
    loader: false,
  };
  toggoleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  handleImageClick = (largeImageURL, imgTags) => {
    this.setState({ largeImageURL, imgTags, loader: true, showModal: true });
  };
  hideLoaderInModal = () => this.setState({ loader: false });

  render() {
    const { showModal, largeImageURL, tags, loader } = this.state;
    const { searchImages } = this.props;
    return (
      <>
        <ul className={s.gallery}>
          {searchImages.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageItemGallery
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              handleImageClick={this.handleImageClick}
            />
          ))}
        </ul>
        {showModal && (
          <Modal onClose={this.toggoleModal}>
            <img
              width="100%"
              src={largeImageURL}
              alt={tags}
              onLoad={this.hideLoaderInModal}
            />
            {loader && <Loaders />}
          </Modal>
        )}
      </>
    );
  }
}
ImageListGallery.propTypes = {
  searchImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
export default ImageListGallery;
