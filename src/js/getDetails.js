import { API_KEY, DETAILS_URL, IMAGE_URL, BACKDROP_URL } from './apiVariables';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { onOpenModal } from './loginWindow';

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

import { createMarkUpLibraryList } from './myLibrary';
import {
  addMovieInfoToDataBaseWatch,
  removeMovieIDFromWatched,
  addMovieInfoToDataBaseQueue,
  removeMovieIDFromQueue,
} from './loginWindow';
import Notiflix from 'notiflix';

let watchedDataBase = [];
let queueDataBase = [];
let watchedArr = [];
let queueArr = [];

const headerLibraryWatchedBtn = document.querySelector(
  '#header-libraryWatched__btn'
);
const headerLibraryQueueBtn = document.querySelector(
  '#header-libraryQueue__btn'
);

const moviesList = document.querySelector('.main__movie-card-list');
const detailsModal = document.querySelector('.details');
const backdropDetails = document.querySelector('.details__backdrop');
const modal = document.querySelector('.details__modal');
const box = document.querySelector('.details__box');
const detCloseBtn = document.querySelector('.details__close-button');
const sliderItem = document.querySelector('.slider-item');
const sliderTrack = document.querySelector('.slider-track');

const clickForDetails = e => {
  e.preventDefault();
  // if (e.target.classList.contains('main__movie-card-item')) {
  //   console.log(e.target);

  //   return;
  // }
  windowAppear();

  const uid = auth.lastNotifiedUid;
  if (uid) {
    const allInfo = ref(db, 'users/' + uid);
    const ifOnValue = onValue(allInfo, snapshot => {
      const data = snapshot.val();
      if (!data) {
        queueDataBase = [];
        watchedDataBase = [];
        queueArr = [];
        watchedArr = [];
        // console.log('All Data Base Is Empty');
      } else {
        if (!data.watched) {
          watchedDataBase = [];
          // console.log('watched Base Is Empty');
        } else {
          watchedDataBase = data.watched;
          watchedArr = Object.keys(data.watched);
        }

        if (!data.queue) {
          queueDataBase = [];
          // console.log('queue Base Is Empty');
        } else {
          queueDataBase = data.queue;
          queueArr = Object.keys(data.queue);
        }
      }
    });
  }

  clearInfo();

  if (e.target.nodeName === 'UL') {
    return;
  }

  const movieId = e.target.closest('[data-movieId]').dataset.movieid;

  checkArr(watchedArr, movieId, 'Watched');
  checkArr(queueArr, movieId, 'Queue');

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

  checkBackdrop(backdrop_path);

  function checkBackdrop(backdrop_path) {
    const backdropImg = `url(${BACKDROP_URL + backdrop_path})`;
    if (backdrop_path === null) {
      backdropDetails.style.backgroundColor = 'rgba(0, 0, 0, 0.8';
    } else {
      backdropDetails.style.backgroundImage = backdropImg;
    }
  }

  let posterPicture = `${IMAGE_URL + poster_path}`;
  if (poster_path === null) {
    posterPicture =
      'https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg';
  }

  const allGenres = genres.map(genre => genre.name).join(', ');

  box.setAttribute('data-id', `${id}`);
  box.setAttribute('data-date', `${release_date.slice(0, 4)}`);

  const infoBox = document.querySelector('.details__info');

  const markupImg = `<div class="details__poster">
                    <img class="details__image"
                        src="${posterPicture}" alt="${title}poster"
                        width="375px" />
                </div>`;

  const markup = `
                    <h2 class="details__title">${title}</h2>
                    <ul class="details__attributesList">
                        <li>
                            <span class="details__attribute"> Vote/Votes
                            </span>
                            <span class="details__attribute-value">
                                <span class="details__attribute-vote">${vote_average}</span> / ${vote_count}</span>
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
                            <span class="details__attribute-value details__genre">${allGenres}</span>
                        </li>
                    </ul>
                    <p class="details__subtitle">about</p>
                    <p class="details__description">${overview}
                    </p>`;

  box.insertAdjacentHTML('afterbegin', markupImg);
  infoBox.insertAdjacentHTML('afterbegin', markup);
}

sliderTrack.addEventListener('click', clickForDetails);

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
  modal.classList.remove('isAppeared');
  backdropDetails.classList.remove('isAppeared');

  if (headerLibraryWatchedBtn.classList.contains('--is-active')) {
    activeLibraryList(watchedDataBase);
  } else if (headerLibraryQueueBtn.classList.contains('--is-active')) {
    activeLibraryList(queueDataBase);
  }
};

const closeByEsc = e => {
  if (e.code === 'Escape') {
    detailsModal.classList.add('isHidden');
    modal.classList.remove('isAppeared');
    backdropDetails.classList.remove('isAppeared');
  }
};

const onBackdropClose = e => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};

window.addEventListener('keydown', closeByEsc);
detCloseBtn.addEventListener('click', onClose);
backdropDetails.addEventListener('click', onBackdropClose);

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

function windowAppear() {
  detailsModal.classList.remove('isHidden');
  backdropDetails.classList.add('isAppeared');
  setTimeout(() => {
    modal.classList.add('isAppeared');
  }, 1000);
}

function activeLibraryList(arr) {
  const listEl = document.querySelector('.main__movie-card-list');
  listEl.innerHTML = '';
  createMarkUpLibraryList(arr);
}

window.addEventListener('keydown', closeByEsc);
detCloseBtn.addEventListener('click', onClose);
backdropDetails.addEventListener('click', onBackdropClose);

const Refs = {
  details__modal: document.querySelector('.details__modal'),
};

Refs.details__modal.addEventListener('click', addToWatched);
Refs.details__modal.addEventListener('click', addToQueue);
Refs.details__modal.addEventListener('click', removeFromWatched);
Refs.details__modal.addEventListener('click', removeFromQueue);

function addToWatched(event) {
  const addBtn = Refs.details__modal.querySelector('.addToWatchedBtn-JS');
  const removeBtn = Refs.details__modal.querySelector(
    '.removeFromWatchedBtn-JS'
  );
  const uid = auth.lastNotifiedUid;

  if (!event.target.classList.contains('addToWatchedBtn-JS')) {
    return;
  } else if (!uid) {
    Notiflix.Notify.info('Login please or Register to add');
    onOpenModal();
  } else if (uid) {
    const movieID = event.target
      .closest('.details__box')
      .getAttribute('data-id');
    const imgPoster = Refs.details__modal
      .querySelector('.details__image')
      .getAttribute('src');
    const titleDetails =
      Refs.details__modal.querySelector('.details__title').textContent;
    const genres =
      Refs.details__modal.querySelector('.details__genre').textContent;
    const year = event.target
      .closest('.details__box')
      .getAttribute('data-date');

    addMovieInfoToDataBaseWatch(
      movieID,
      titleDetails,
      imgPoster,
      genres,
      year,
      uid
    );
    addBtn.classList.add('isHidden');
    removeBtn.classList.remove('isHidden');
  }
}

function removeFromWatched(event) {
  const addBtn = Refs.details__modal.querySelector('.addToWatchedBtn-JS');
  const removeBtn = Refs.details__modal.querySelector(
    '.removeFromWatchedBtn-JS'
  );
  if (!event.target.classList.contains('removeFromWatchedBtn-JS')) {
    return;
  }
  const movieID = event.target.closest('.details__box').getAttribute('data-id');
  const uid = auth.lastNotifiedUid;
  removeMovieIDFromWatched(uid, movieID);
  addBtn.classList.remove('isHidden');
  removeBtn.classList.add('isHidden');
  watchedArr = [];
}

function addToQueue(event) {
  const addBtn = Refs.details__modal.querySelector('.addToQueueBtn-JS');
  const removeBtn = Refs.details__modal.querySelector('.removeFromQueueBtn-JS');
  const uid = auth.lastNotifiedUid;
  if (!event.target.classList.contains('addToQueueBtn-JS')) {
    return;
  } else if (!uid) {
    Notiflix.Notify.info('Login please or Register to add');

    onOpenModal();
  } else if (uid) {
    const movieID = event.target
      .closest('.details__box')
      .getAttribute('data-id');
    const imgPoster = Refs.details__modal
      .querySelector('.details__image')
      .getAttribute('src');
    const titleDetails =
      Refs.details__modal.querySelector('.details__title').textContent;
    const genres =
      Refs.details__modal.querySelector('.details__genre').textContent;
    const year = event.target
      .closest('.details__box')
      .getAttribute('data-date');

    addMovieInfoToDataBaseQueue(
      movieID,
      titleDetails,
      imgPoster,
      genres,
      year,
      uid
    );
    addBtn.classList.add('isHidden');
    removeBtn.classList.remove('isHidden');
  }
}

function removeFromQueue(event) {
  const addBtn = Refs.details__modal.querySelector('.addToQueueBtn-JS');
  const removeBtn = Refs.details__modal.querySelector('.removeFromQueueBtn-JS');
  if (!event.target.classList.contains('removeFromQueueBtn-JS')) {
    return;
  }
  const movieID = event.target.closest('.details__box').getAttribute('data-id');
  const uid = auth.lastNotifiedUid;
  removeMovieIDFromQueue(uid, movieID);
  addBtn.classList.remove('isHidden');
  removeBtn.classList.add('isHidden');
  queueArr = [];
}
