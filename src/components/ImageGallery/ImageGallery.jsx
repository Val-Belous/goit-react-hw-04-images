import { Component } from 'react';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from './ImageGalleryItem';
import { createRequest } from 'api/api';
import styles from './ImageGallery.module.css';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  success: 'success',
};

export class ImageGallery extends Component {
  static propTypes = {
    handlerOpenModal: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  };

  state = {
    gallery: [],
    totalHits: null,
    page: 1,
    status: STATUS.idle,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ status: STATUS.loading });
      createRequest(this.props.query)
        .then(res => {
          const { data } = res;
          if (data.hits.length === 0) {
            alert('You enter invalid search request');
          }
          this.setState(prevState => ({
            gallery: [...data.hits],
            page: 2,
            totalHits: data.totalHits,
            status: STATUS.success,
          }));
        })
        .catch(error => {
          this.setState({ status: STATUS.error, error });
        });
    }
  }

  loadMore = () => {
    createRequest(this.props.query, this.state.page)
      .then(res => {
        const { hits } = res.data;
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => {
        this.setState({ status: STATUS.error, error });
      });
  };

  render() {
    const { gallery, totalHits, page, status, error } = this.state;
    if (status === STATUS.loading) {
      return <Loader />;
    }
    if (status === STATUS.error) {
      return <p>{error}</p>;
    }
    if (!gallery.length) {
      return (
        <p
          style={{
            margin: '300px auto',
            fontSize: '50px',
          }}
        >{`Please, enter search request`}</p>
      );
    }
    return (
      <>
        <ul className={styles.gallery}>
          {gallery.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                smallImg={webformatURL}
                largeImg={largeImageURL}
                handlerOpenModal={this.props.handlerOpenModal}
              />
            );
          })}
        </ul>
        {totalHits >= 12 * page && <Button onClick={this.loadMore} />}
      </>
    );
  }
}
