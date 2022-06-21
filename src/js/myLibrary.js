// убрать margin у наташи
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
const uid = auth.lastNotifiedUid;

import { renderNewPage } from './getTrendFilms';
import { createListMarkup } from './renderFilms';

const myLibBtn = document.querySelector(
  '[data-action="header-library-button"]'
);
const homeBtn = document.querySelector('[data-action="header-home-button"]');
const headerMain = document.querySelector('.header-main');
const headLib = document.querySelector('.header-main__library');
const listEl = document.querySelector('.main__movie-card-list');
const mainBtnList = document.querySelector('.main__button-list');

// const mainCont = document.querySelector('#main-container');

myLibBtn.addEventListener('click', onClickLibraryBtn);
homeBtn.addEventListener('click', onClickHomeBtn);

function onClickLibraryBtn(e) {
  e.preventDefault();
  headerMain.classList.add('--is-hidden');
  headLib.classList.remove('--is-hidden');
  mainBtnList.classList.add('--is-hidden');
  homeBtn.classList.remove('is-current');
  myLibBtn.classList.add('is-current');
  listEl.innerHTML = '';

  let watchedDataBase = {};
  const uid = auth.lastNotifiedUid;
  const allInfo = ref(db, 'users/' + uid);

  onValue(allInfo, snapshot => {
    const data = snapshot.val();
    watchedDataBase = data.watched;
    // console.log(data.watched);
    // console.log(data.queue);
  });
  console.log(watchedDataBase);
  //   createListMarkup(watchedDataBase);
}

function onClickHomeBtn(e) {
  e.preventDefault();
  headerMain.classList.remove('--is-hidden');
  headLib.classList.add('--is-hidden');
  mainBtnList.classList.remove('--is-hidden');
  homeBtn.classList.add('is-current');
  myLibBtn.classList.remove('is-current');
  renderNewPage();
}
