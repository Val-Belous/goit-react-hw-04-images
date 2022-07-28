import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '28350308-94cf9f8b9e1d3a4f8bcec6d50';

async function createRequest(name, page = 1) {
  const params = {
    url: URL,
    params: {
      key: KEY,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: false,
      q: name,
      per_page: 12,
    },
  };
  return await axios(params);
}

export { createRequest };
