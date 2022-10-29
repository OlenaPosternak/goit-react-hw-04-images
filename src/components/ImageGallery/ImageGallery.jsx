import PropTypes from 'prop-types';
import Item from '../ImageGalleryItem/ImageGalleryItem';
import { AllGallery } from './ImageGallery.mudule';

export default function ImageGallery({data}) {
  return (
    <>
      <AllGallery>
        {data.map(({ id, webformatURL, tags, largeImageURL }) => (
          <Item
            key={id}
            src={webformatURL}
            alt={tags}
            srcLarge={largeImageURL}
          />
        ))}
      </AllGallery>
      
    </>
  );
}

ImageGallery.propType = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  page: PropTypes.number,
  loading: PropTypes.bool,
  totalPictures: PropTypes.number,
};
