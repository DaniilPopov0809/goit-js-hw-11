import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchCardsGallery } from './fetchCardsGallery';
import Notiflix from 'notiflix';

const loadMoreCards = document.querySelector('.load-more');
const sumbitForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');

let gallery = new SimpleLightbox('.gallery a');
let page = 1;
let searchTerm;
let allCards = null;
let oneDownloadCards = null;
let downloadCards = null;

loadMoreCards.style.display = 'none';

sumbitForm.addEventListener('submit', onSearchImage);
loadMoreCards.addEventListener('click', onLoadCards);

function onSearchImage(event) {
  event.preventDefault();
  clearContainerGallery();
  oneDownloadCards = 151;
  downloadCards = 0;
  page = 1;

  searchTerm = event.currentTarget.elements.searchQuery.value;

  if (searchTerm === '') {
    loadMoreCards.style.display = 'none';
    Notiflix.Notify.info('Enter search image name!');
  } else {
    updateUI(searchTerm);
  }
}

async function updateUI(search) {
  const getDataCards = await fetchCardsGallery(search, page, oneDownloadCards);
  allCards = getDataCards.totalHits;

  if (getDataCards.hits.length === 0) {
    loadMoreCards.style.display = 'none';
    createErrorMessage();
  } else {
    loadMoreCards.style.display = 'block';

    if (downloadCards + oneDownloadCards === allCards) {
      loadMoreCards.style.display = 'none';
    }
    createMessageAllCards();
    const dataNeedForPaintCards = createMarkup(getDataCards);
    galleryContainer.insertAdjacentHTML('beforeend', dataNeedForPaintCards);
    gallery.refresh();
    smoothScroll();
  }
}

function onLoadCards() {
  if (downloadCards + oneDownloadCards >= allCards) {
    oneDownloadCards =
      oneDownloadCards - Math.abs(allCards - (page + 1) * oneDownloadCards);
    createWarningMessage();
  } else {
    page++;
    downloadCards = page * oneDownloadCards;
  }
  updateUI(searchTerm);
}

function clearContainerGallery() {
  galleryContainer.innerHTML = '';
}

function createMarkup({ hits }) {
  return hits
    .map(card => {
      return `<div class="photo-card">
      <a class="gallery__item" href="${card.largeImageURL}">
      <img class="gallery__image" src="${card.webformatURL}" alt="${card.tags}" loading="lazy"/>
    </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${card.likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>${card.views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${card.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${card.downloads}
    </p>
  </div>
</div>`;
    })
    .join(' ');
}

function createMessageAllCards() {
  if (page === 1 && searchTerm !== '') {
    Notiflix.Notify.success(`Hooray! We found ${allCards}`);
  }
}

function createErrorMessage() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function createWarningMessage() {
  Notiflix.Notify.warning(
    `We're sorry, but you've reached the end of search results.`
  );
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
