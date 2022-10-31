import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { Overlay, ModalWindow } from './Modal.module';

export default function Modal({ onClose, largeImageURL }) {
  useEffect(() => {
    const pressESC = e => {
      if (e.code === `Escape`) {
        onClose();
      }
    };
    window.addEventListener('keydown', pressESC);

    return () => window.removeEventListener('keydown', pressESC);
  }, [onClose]);

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
