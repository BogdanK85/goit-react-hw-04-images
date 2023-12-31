import { useEffect, useState } from 'react';
import { fetchNewPictures } from 'API/API';
import { SectionApp } from 'components/SectionApp/SectionApp';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreBtn } from 'components/Button/Button';
import { Spiner } from 'components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'components/Modal/Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(12);
  const [images, setImages] = useState([]);
  // const [webformatURL, setWebformatURL] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowLoadMoreBtn, setIsShowLoadMoreBtn] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    if (page === 1) {
      setImages([]);
    }
    const fetchPictures = async () => {
      try {
        setIsLoading(true);

        const newPictures = await fetchNewPictures(searchQuery, page);

        if (newPictures.hits.length > 0 && page === 1) {
          toast.success('Your picture found!');
        } else if (newPictures.hits.length === 0) {
          throw new Error();
        }
        setImages(prevImages => [...prevImages, ...newPictures.hits]);
        setIsShowLoadMoreBtn(page < Math.ceil(newPictures.totalHits / 12));
      } catch (error) {
        toast.error(
          'Does not have pictures at your request. Please try agein..'
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchPictures();
  }, [searchQuery, page]);

  const onFormSubmit = query => {
    if (searchQuery === query) {
      return toast.warn(`You are viewing ${searchQuery}`);
    }
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onPictureClick = largeImageURL => {
    setIsLoading(true);
    setLargeImageURL(largeImageURL);
    setIsShowModal(true);
    toggleModal();
  };
  const onCloseModal = () => {
    setIsShowModal(false);
  };
  const toggleModal = () => {
    setIsShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SectionApp>
        <Searchbar onSubmit={onFormSubmit} />
        {images.length > 0 && (
          <ImageGallery newPictures={images} onPictureClick={onPictureClick} />
        )}

        {isShowLoadMoreBtn && (
          <LoadMoreBtn onClick={onLoadMore} isVisible={!isLoading} />
        )}

        {isLoading && <Spiner loading={isLoading} size={125} />}
        {isShowModal && (
          <Modal largeImageURL={largeImageURL} onClose={onCloseModal} />
        )}
      </SectionApp>
    </>
  );
};
