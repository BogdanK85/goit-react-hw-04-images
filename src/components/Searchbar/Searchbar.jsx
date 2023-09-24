import { useState } from 'react';
import {
  FormStyle,
  HeaderStyle,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onFormChange = evt => {
    setSearchQuery(evt.currentTarget.value);
  };

  const onFormSubmit = evt => {
    evt.preventDefault();
    if (searchQuery.trim() === '') {
      toast.info('field must be filled in');
      return;
    }
    onSubmit(searchQuery.toLowerCase().trim());
    formReset();
  };

  const formReset = () => {
    setSearchQuery('');
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
      <HeaderStyle>
        <FormStyle onSubmit={onFormSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and pictures"
            onChange={onFormChange}
            value={searchQuery}
          />
        </FormStyle>
      </HeaderStyle>
    </>
  );
};
