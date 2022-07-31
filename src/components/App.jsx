import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [image, setImage] = useState('');
  const [query, setQuery] = useState('');

  const handlerOpenModal = img => {
    setImage(img);
  };

  const handlerCloseModal = () => {
    setImage('');
  };

  const handlerForm = query => {
    setQuery(query);
  };

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
        <Searchbar onSubmit={handlerForm} />
        <ImageGallery query={query} handlerOpenModal={handlerOpenModal} />
        {image && <Modal image={image} onClose={handlerCloseModal} />}
      </div>
    </>
  );
};
