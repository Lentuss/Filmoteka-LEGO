import { API_KEY, DETAILS_URL, IMAGE_URL, BACKDROP_URL } from './apiVariables';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import { getDatabase, ref, onValue } from 'firebase/database';
const firebaseConfig = {
  apiKey: 'AIzaSyAXr3vyab8PJtuI-kO5zXVUNDPWQzN3ayY',
  authDomain: 'filmoteka-group5.firebaseapp.com',
  databaseURL:
    'https://filmoteka-group5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-group5',
  storageBucket: 'filmoteka-group5.appspot.com',
  messagingSenderId: '217077508176',
  appId: '1:217077508176:web:dbb78c93f591370ec90955',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const moviesList = document.querySelector('.main__movie-card-list');
const detailsModal = document.querySelector('.details');
const backdropDetails = document.querySelector('.details__backdrop');
const modal = document.querySelector('.details__modal');
const box = document.querySelector('.details__box');
const detCloseBtn = document.querySelector('.details__close-button');

/// если нет деталей
// если нет постера
//если нет бекдропа
//если нет ничего
//очистка
//on slider??
///проверки
//стили жанров мобилки/таблетки
//убрать клик с жанров
//курсор поинтер

const clickForDetails = e => {
  e.preventDefault();

  const uid = auth.lastNotifiedUid;
  let watchedArr = [];
  let queueArr = [];

  if (uid) {
    const allInfo = ref(db, 'users/' + uid);
    const ifOnValue = onValue(allInfo, snapshot => {
      const data = snapshot.val();

      if (!data) {
        console.log('All Data Base Is Empty');
      } else {
        if (!data.watched) {
          console.log('watched Base Is Empty');
        } else {
          watchedArr = Object.keys(data.watched);
        }

        if (!data.queue) {
          console.log('queue Base Is Empty');
        } else {
          queueArr = Object.keys(data.queue);
        }
      }
    });
  }

  clearInfo();

  // setTimeout(() => {
  detailsModal.classList.remove('isHidden');
  backdropDetails.classList.add('isAppeared');
  setTimeout(() => {
    modal.classList.add('isAppeared');
  }, 2500);
  // }, 500);
  // console.log(e.target);// начнем-с
  if (
    e.target.nodeName === 'UL'
    // ||
    // e.target.nodeName === 'SPAN' ||
    // e.target.nodeName === 'P'
  ) {
    return;
  }
  const movieId = e.target.closest('LI').dataset.movieid;

  checkArr(watchedArr, movieId, 'Watched');
  checkArr(queueArr, movieId, 'Queue');

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

  backdropDetails.style.backgroundImage = `url(${
    BACKDROP_URL + backdrop_path
  })`;
  //дописать логику отсутствия

  const genreArr = genres.map(genre => genre.name);

  box.setAttribute('data-id', `${id}`);
  box.setAttribute('data-date', `${release_date.slice(0, 4)}`);

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
  backdropDetails.style.backgroundColor = 'black';
  backdropDetails.style.backgroundImage = 'url(#)';
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

function checkArr(arr, movieID, arrName) {
  const selector = arrName;

  for (const item of arr) {
    if (item === movieID) {
      console.log('we found same ID');

      const addBtn = document.querySelector(`.addTo${selector}Btn-JS`);
      const removeBtn = document.querySelector(`.removeFrom${selector}Btn-JS`);
      addBtn.classList.add('isHidden');
      removeBtn.classList.remove('isHidden');
    }
  }
}

window.addEventListener('keydown', closeByEsc);
detCloseBtn.addEventListener('click', onClose);
backdropDetails.addEventListener('click', onBackdropClose);
