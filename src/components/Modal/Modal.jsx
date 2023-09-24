// import { useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { ModalStyle, OverlayStyle } from './Modal.styled';

// const modalRoot = document.querySelector('#modal-root');

// const Modal = ({ largeImageURL, onCloseModal }) => {
//   const onBackdropClick = event => {
//     if (event.target === event.currentTarget) {
//       onCloseModal();
//     }
//   };

//   useEffect(() => {
//     const handlePressEscape = event => {
//       if (event.code === 'Escape') {
//         onCloseModal();
//       }
//     };

//     document.addEventListener('keydown', handlePressEscape);
//     return () => {
//       document.removeEventListener('keydown', handlePressEscape);
//     };
//   }, [onCloseModal]);

//   return createPortal(
//     <OverlayStyle onClick={onBackdropClick}>
//       <ModalStyle>
//         <img src={largeImageURL} alt="Pixabay" />
//       </ModalStyle>
//     </OverlayStyle>,
//     modalRoot
//   );
// };
// export default Modal;
