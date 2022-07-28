import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImg, largeImg, handlerOpenModal }) => {
  return (
    <li className={styles.item}>
      <img
        className={styles.img}
        src={smallImg}
        alt="lol"
        onClick={() => handlerOpenModal(largeImg)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  handlerOpenModal: PropTypes.func.isRequired,
};

export { ImageGalleryItem };
