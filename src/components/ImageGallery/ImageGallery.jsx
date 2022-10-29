import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import Item from '../ImageGalleryItem/ImageGalleryItem';
import { AllGallery } from './ImageGallery.mudule';
import { Loader } from '../Loader/Loader';
import { ButtonMore } from '../Button/Button';
import axios from 'axios';

export default function ImageGallery({ galleryName }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPictures, setTotalPictures] = useState(1);

  useEffect(() => {setData([])}, [galleryName]);
  useEffect(() => {setPage(1)}, [galleryName]);

  useEffect(() => {

    // якщо немає слова для пошуку, то запит не робимо
    if (galleryName === '') {
      return;
    }

    setLoading(true);

    async function fetchUrl(galleryName, page=1) {
    //   const controller = new AbortController();

      try {
        const responce = await axios.get('https://pixabay.com/api/', {
          params: {
            key: '29526037-011b39b59387f2f37ea2d4748',
            q: `${galleryName}`,
            page: `${page}`,
            image_type: `photo`,
            orientation: `horizontal`,
            per_page: 12,

            // signal: controller.signal,
          },
        });

        setData(prevState => [...prevState, ...responce.data.hits]);
        setTotalPictures(responce.data.totalHits);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    //   return () => {
    //     controller.abort();
    //   };
    }
    fetchUrl(galleryName, page);

    console.log(`1`);


  }, [page, galleryName]);

 const  loadMore =()=> {
    setPage(prevState => prevState + 1);
  }

  

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
      {loading && <Loader />}

      {data.length !== 0 && Math.floor(totalPictures / 12) > page && (
        <ButtonMore
          onClick={loadMore}
        />
      )}
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
