import { API_KEY, DETAILS_URL, IMAGE_URL, BACKDROP_URL } from './apiVariables';
import axios from 'axios';

const moviesList = document.querySelector('.main__movie-card-list');
const detailsModal = document.querySelector('.details');
const backdropDetails = document.querySelector('.details__backdrop');
const box = document.querySelector('.details__box');
const detCloseBtn = document.querySelector('.details__close-button');

/// если нет деталей
// если нет постера
//если нет бекдропа
//если нет ничего
//очистка
//on slider
///проверки
//стили жанров мобилки/таблетки
//фит фотки
//убрать клик с жанров
//курсор поинтер

const clickForDetails = e => {
  e.preventDefault();
  clearInfo();

  detailsModal.classList.remove('isHidden');

  if (e.target.nodeName === 'UL') {
    return;
  }
  const movieId = e.target.closest('LI').dataset.movieid;
  console.log(movieId);
  getDetails(movieId);
};

moviesList.addEventListener('click', clickForDetails);

export async function getDetails(movieId) {
  const details = await axios
    .get(`${DETAILS_URL + movieId}?api_key=${API_KEY}&language=en-US`)
    .then(({ data }) => data);

  const {
    backdrop_path,
    genres,
    original_title,
    overview,
    poster_path,
    popularity,
    title,
    vote_average,
    vote_count,
    id,
    release_date,
  } = details;

  const genreArr = genres.map(genre => genre.name);

  box.setAttribute('data-id', `${id}`);
  box.setAttribute('data-date', `${release_date.slice(0, 4)}`);

  backdropDetails.style.backgroundImage = `url(${
    BACKDROP_URL + backdrop_path
  })`;
  //дописать логику отсутствия

  const infoBox = document.querySelector('.details__info');

  const markupImg = `<div class="details__poster">
                    <img class="details__image"
                        src="${IMAGE_URL + poster_path}" alt="${title}poster"
                        width="375px" />
                </div>`;

  const markup = `
                    <h2 class="details__title">${title}</h2>
                    <ul class="details__attributesList">
                        <li>
                            <span class="details__attribute"> Vote/Votes
                            </span>
                            <span class="details__attribute-value">
                                <span class="details__attribute-vote">${vote_count}</span> / ${vote_average}</span>
                        </li>
                        <li>
                            <span class="details__attribute">Popularity
                            </span>
                            <span class="details__attribute-value">
                                ${popularity}
                            </span>
                        </li>
                        <li>
                            <span class="details__attribute">Original Title
                            </span>
                            <span class="details__attribute-value details__attribute-title">
                                ${original_title}
                            </span>
                        </li>
                        <li>
                            <span class="details__attribute">Genre
                            </span>
                            <span class="details__attribute-value details__genre">${genreArr}</span>
                        </li>
                    </ul>
                    <p class="details__subtitle">about</p>
                    <p class="details__description">${overview}
                    </p>`;

  box.insertAdjacentHTML('afterbegin', markupImg);
  infoBox.insertAdjacentHTML('afterbegin', markup);
}

//+++++close-modal++++++

const clearInfo = () => {
  box.innerHTML = ` <div class="details__info">
                    <div class="details__buttonSet">
                        <button class="details__button addToWatchedBtn-JS details__button-accent" type="button"
                            data-action="details-watched-btn">add to
                            watched</button>
                        <button class="details__button removeFromWatchedBtn-JS isHidden" type="button"
                            data-action="details-del-watched-btn">remove from
                            watched</button>
                        <button class="details__button addToQueueBtn-JS" type="button"
                            data-action="details-queue-btn">add to
                            queue</button>
                        <button class="details__button removeFromQueueBtn-JS isHidden" type="button"
                            data-action="details-del-queue-btn">remove from
                            queue</button>
                    </div>
                </div>`;
};

const onClose = e => {
  detailsModal.classList.add('isHidden');
};

const closeByEsc = e => {
  //   e.preventDefault();
  if (e.code === 'Escape') {
    detailsModal.classList.add('isHidden');
  }
};

const onBackdropClose = e => {
  //   e.preventDefault();
  if (e.target === e.currentTarget) {
    onClose();
  }
};

window.addEventListener('keydown', closeByEsc);
detCloseBtn.addEventListener('click', onClose);
backdropDetails.addEventListener('click', onBackdropClose);
