import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';

async function fetchCardsGallery(searchTerm, page, per_page) {
  const PARAMS = {
    params: {
      key: '33059287-a3adfd6fce60f5adf99857961',
      q: `${searchTerm}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${page}`,
      per_page: `${per_page}`,
    },
  };
  try {
    const response = await axios.get(BASE_URL, PARAMS);
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure('Oops, something went wrong!');
  }
}

export { fetchCardsGallery };
