import { BASE_URL } from './apiVariables';
import GetFilmsApiService from './getFilmsApiService';
import { createListMarkup } from './renderFilms';

const listEl = document.querySelector('.main__movie-card-list');
const loaderEl = document.querySelector('.loader');
const btnDayEl = document.querySelector('.trends-of-day');
const btnWeekEl = document.querySelector('.trends-of-week');
const getFilmsApiService = new GetFilmsApiService();

btnDayEl.addEventListener('click', onBtnDayClick);
btnWeekEl.addEventListener('click', onBtnWeekClick);


renderNewPage();


export function renderNewPage() {
    loaderEl.style.display = "block";
    listEl.innerHTML = '';
    getFilmsApiService.resetPage();
    getTrendFilms(); 
}

function onBtnDayClick() {
    getFilmsApiService.trendsOfDay();
    renderNewPage(); 
}

function onBtnWeekClick() {
    getFilmsApiService.trendsOfWeek();
    renderNewPage();    
}

export async function getTrendFilms() {
    try {
        const requestedFilms = await getFilmsApiService.getFilms(BASE_URL);
        onGetSucces(requestedFilms);
    } catch (error) {
        onGetError();
    }
};

function onGetSucces(requestedFilms) {
    loaderEl.style.display = "none";
    listEl.insertAdjacentHTML('beforeend', createListMarkup(requestedFilms));
    observer.observe(listEl.lastElementChild);
};

function onGetError(error) {
    loaderEl.style.display = "none";
    console.log(error);
};

// infinite scroll

const options = {
  intersectionObserver: {
    root: listEl.lastElementChild,
    rootMargin: "0px 0px 200px 0px",
    threshold: 1,
  },
};
const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        getTrendFilms();
  }
};
 
const observer = new IntersectionObserver(callback, options.intersectionObserver);
