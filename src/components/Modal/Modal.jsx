import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Modal.module.css';

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const onClick = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onClick);
    return () => {
      window.removeEventListener('keydown', onClick);
    };
  }, [onClose]);

  const handlerBackDrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handlerBackDrop}>
      <div className={styles.modal}>
        <img className={styles.modal__img} src={image} alt="img" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
