import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    image: '',
    query: '',
  };

  handlerOpenModal = img => {
    this.setState({ image: img });
  };

  handlerCloseModal = () => {
    this.setState({ image: '' });
  };

  handlerForm = query => {
    this.setState({ query });
  };

  render() {
    const { image, query } = this.state;
    return (
      <>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr0',
            gridGap: '16px',
            paddingBottom: '24px',
          }}
        >
          <Searchbar onSubmit={this.handlerForm} />
          <ImageGallery
            query={query}
            handlerOpenModal={this.handlerOpenModal}
          />
          {image && <Modal image={image} onClose={this.handlerCloseModal} />}
        </div>
      </>
    );
  }
}
