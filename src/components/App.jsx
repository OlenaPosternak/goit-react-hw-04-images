import PropTypes from 'prop-types';

import { ToastContainer } from 'react-toastify';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

import { AppStyled } from './App.module';

import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export default function App() {
  const [searchValue, setSearchValue] = useState('');

  const onSubmitSerach = searchInfo => {
    setSearchValue(searchInfo);
  };

  return (
    <AppStyled>
      <SearchBar onSearch={onSubmitSerach} />
      <ImageGallery galleryName={searchValue} />
      <ToastContainer autoClose={3000} closeOnClick />
    </AppStyled>
  );
}

App.propType = {
  searchValue: PropTypes.string,
  onSubmitSerach: PropTypes.func,
};
