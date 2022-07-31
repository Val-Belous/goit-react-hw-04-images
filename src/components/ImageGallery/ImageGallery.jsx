import { useState, useEffect } from 'react';
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

export const ImageGallery = ({ query, handlerOpenModal }) => {
  // static propTypes = {
  //   handlerOpenModal: PropTypes.func.isRequired,
  //   query: PropTypes.string.isRequired,
  // };

  // state = {
  //   gallery: [],
  //   totalHits: null,
  //   page: 1,
  //   status: STATUS.idle,
  // };

  const [gallery, setGallery] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.idle);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query && page === 1) {
      return;
    }
    setStatus(STATUS.loading);
    createRequest(query, page)
      .then(res => {
        const { data } = res;
        setGallery(prev => [...prev, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus(STATUS.success);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setStatus(STATUS.error);
      });
  }, [query, page]);

  // componentDidUpdate(prevProps) {
  //   if (prevProps.query !== this.props.query) {
  //     this.setState({ status: STATUS.loading });
  //     createRequest(query)
  //       .then(res => {
  //         const { data } = res;
  //         if (data.hits.length === 0) {
  //           alert('You enter invalid search request');
  //         }
  //         this.setState(prevState => ({
  //           gallery: [...data.hits],
  //           page: 2,
  //           totalHits: data.totalHits,
  //           status: STATUS.success,
  //         }));
  //       })
  //       .catch(error => {
  //         this.setState({ status: STATUS.error, error });
  //       });
  //   }
  // }

  const loadMore = () => {
    createRequest(query, page)
      .then(res => {
        const { hits } = res.data;
        setPage(prevState => ({
          gallery: [...gallery, ...hits],
          page: page + 1,
        }));
      })
      .catch(error => {
        setError({ status: STATUS.error, error });
      });
  };

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
              handlerOpenModal={handlerOpenModal}
            />
          );
        })}
      </ul>
      {totalHits >= 12 * page && <Button onClick={loadMore} />}
    </>
  );
};
