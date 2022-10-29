import PropTypes from 'prop-types';

import { useState } from 'react';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  Input,
} from './SearchBar.module';

import { IoIosSearch } from 'react-icons/io';
import { toast } from 'react-toastify';

export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const search = event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

  const reset = () => {
    setSearchValue('');
  };

  const handelSubmit = event => {
    event.preventDefault();

    if (searchValue.trim() === ``) {
      toast.error('Please choose picture', { theme: 'colored' });
      return;
    }

    onSearch(searchValue);
    // setSearchValue('');
    // reset();
  };

  return (
    <>
      <SearchBarHeader>
        <SearchForm onSubmit={handelSubmit}>
          <SearchFormButton type="submit">
            <IoIosSearch size="24" />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <Input
            onChange={search}
            value={searchValue}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchBarHeader>
    </>
  );
}

SearchBar.propTypes = {
  searchValue: PropTypes.string,
  onSearch: PropTypes.func,
};
