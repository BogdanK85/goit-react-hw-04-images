import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';

export const ImageGallery = ({ newPictures, onClick }) => {
  return (
    <>
      <ImageGalleryStyle>
        {newPictures.map(picture => (
          <ImageGalleryItem
            key={picture.id}
            webformatURL={picture.webformatURL}
            largeImageURL={picture.largeImageURL}
            onClick={onClick}
          />
        ))}
      </ImageGalleryStyle>
    </>
  );
};
