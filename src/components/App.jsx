import PropTypes from 'prop-types';

import { ToastContainer } from 'react-toastify';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

import { AppStyled } from './App.module';
import { Loader } from '../components/Loader/Loader';
import { ButtonMore } from '../components/Button/Button';

import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {

  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPictures, setTotalPictures] = useState(1);


  console.log(searchValue);

  useEffect(() => {
    // якщо немає слова для пошуку, то запит не робимо
    if (searchValue === '') {
      return;
    }

    setLoading(true);

    async function fetchUrl() {
      const controller = new AbortController();

      try {
        const responce = await axios.get('https://pixabay.com/api/', {
          params: {
            key: '29526037-011b39b59387f2f37ea2d4748',
            q: `${searchValue}`,
            page: `${page}`,
            image_type: `photo`,
            orientation: `horizontal`,
            per_page: 12,

            signal: controller.signal,
          },
        });

        setData(prevState => [...prevState, ...responce.data.hits]);
        setTotalPictures(responce.data.totalHits);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      return () => {
        controller.abort();
      };
    }
    fetchUrl(searchValue, page);

  }, [page, searchValue]);

  const loadMore = () => {
    setPage(prevState=>prevState+1);
  };


  const onSubmitSerach = searchInfo => {
    setSearchValue(searchInfo);
    setData([]);
    setPage(1);
  };

  return (
    <AppStyled>
      <SearchBar onSearch={onSubmitSerach}  />
      <ImageGallery galleryName={searchValue} data={data} />
      {loading && <Loader />}

      {data.length !== 0 && Math.floor(totalPictures / 12) > page && (
        <ButtonMore onClick={loadMore} />
      )}
      <ToastContainer autoClose={3000} closeOnClick />
    </AppStyled>
  );
}

App.propType = {
  searchValue: PropTypes.string,
  onSubmitSerach: PropTypes.func,
};
