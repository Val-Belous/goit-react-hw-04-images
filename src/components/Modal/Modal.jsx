import PropTypes from 'prop-types';
import { Component } from 'react';
import styles from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onTap);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onTap);
  }

  onTap = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };
  handlerBackDrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={styles.backdrop} onClick={this.handlerBackDrop}>
        <div className={styles.modal}>
          <img className={styles.modal__img} src={this.props.image} alt="img" />
        </div>
      </div>
    );
  }
}
