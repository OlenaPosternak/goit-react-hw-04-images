import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from './Modal.module';

export default function Modal({ onClose, largeImageURL }) {
  window.addEventListener('keydown', pressESC);

  function pressESC(e) {
    if (e.code === `Escape`) {
      onClose();
      window.removeEventListener('keydown', pressESC);
    }
  }

  const onBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={onBackDropClick}>
      <ModalWindow>
        <img src={largeImageURL} alt="" />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propType = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};
