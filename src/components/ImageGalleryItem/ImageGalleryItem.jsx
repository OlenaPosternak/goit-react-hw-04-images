import PropTypes from 'prop-types';

import { ImageGalleryItem, ItemImage } from './ImageGalleryItem.module';
import Modal from '../Modal/Modal';

import { useState } from 'react';

export default function Item({ src, alt, srcLarge }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && <Modal onClose={onCloseModal} largeImageURL={srcLarge} />}

      <ImageGalleryItem onClick={onOpenModal}>
        <ItemImage src={src} alt={alt} />
      </ImageGalleryItem>
    </>
  );
}

Item.propType = {
  isModalOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
  srcLarge: PropTypes.string,
  src: PropTypes.string,
  tags: PropTypes.string,
};
