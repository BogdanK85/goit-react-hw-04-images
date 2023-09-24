import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import {
  ImageGalleryItemPicture,
  ImageGalleryItemStyle,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal(prevState => !prevState);
  };
  const onImgClick = evt => {
    evt.preventDefault();
    toggleModal();
  };

  return (
    <>
      <ImageGalleryItemStyle onClick={onImgClick}>
        <ImageGalleryItemPicture
          src={webformatURL}
          alt="pixabay"
          width="360"
          height="240"
          loading="lazy"
        />
      </ImageGalleryItemStyle>
      {isShowModal && (
        <Modal largeImageURL={largeImageURL} onCloseModal={toggleModal} />
      )}
    </>
  );
};

export default ImageGalleryItem;
