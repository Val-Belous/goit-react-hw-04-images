import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handlerInput = evt => {
    setQuery(evt.currentTarget.value);
  };

  const handlerSubmit = evt => {
    evt.preventDefault();
    if (!query.trim()) {
      alert('enter valid search request');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handlerSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.ButtonLabel}>Search</span>
        </button>
        <input
          name="query"
          value={query}
          onChange={handlerInput}
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
