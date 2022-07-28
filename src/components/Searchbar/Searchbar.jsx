import PropTypes from 'prop-types';
import { Component } from 'react';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    query: '',
  };

  handlerInput = evt => {
    this.setState({ query: evt.currentTarget.value });
  };

  handlerSubmit = evt => {
    const { query } = this.state;
    evt.preventDefault();
    if (!query.trim()) {
      alert('enter valid search request');
      return;
    }
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handlerSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.ButtonLabel}>Search</span>
          </button>
          <input
            name="query"
            value={query}
            onChange={this.handlerInput}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
