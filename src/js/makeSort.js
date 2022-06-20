import { BASE_URL, API_KEY } from "./apiVariables";
import { createListMarkup } from './renderFilms';

let PAGE = 1;
let SORT_BY = "";

const refs = {
    loaderEl: document.querySelector('.loader'),
    selectEl: document.querySelector('#select'),
    galleryEl: document.querySelector('.main__movie-card-list'),
    inputEl: document.querySelector('#input-form'),
};

refs.selectEl.addEventListener('change', onSelectChange);

 
async function onSelectChange(e) { 
    cleanMarkup();
    addLoader();

    SORT_BY = e.target.value;

    try {
        getSortApiFilm(SORT_BY);
    } catch (error) { 
        console.log(error);
    };
};

async function getSortApiFilm(SORT_BY) { 
    const resp = await getSortUrl(SORT_BY, PAGE);
    const respJson = await resp.json();
    const results = await respJson;

    PAGE = PAGE + 1;
        
    renderMovieList(results);
};

function getSortUrl(SORT_BY, PAGE) { 
    return fetch(`${BASE_URL}discover/movie?api_key=${API_KEY}&sort_by=${SORT_BY}&page=${PAGE}`)
};

function renderMovieList(movieList) { 
    const sortedMovieForRender = createListMarkup(movieList);

    removeLoader();

    refs.galleryEl.insertAdjacentHTML('beforeend', sortedMovieForRender) ;
    observer.observe(refs.galleryEl.lastElementChild);
}; 

function cleanMarkup() {
    refs.galleryEl.innerHTML = "";
};

function addLoader() { 
    refs.galleryEl.innerHTML = `<div class="loader"></div>`;
    refs.loaderEl.style.display = "block";
};

function removeLoader() { 
    refs.loaderEl.style.display = "none";
};

// infinite scroll

const options = {
  intersectionObserver: {
    root: refs.galleryEl.lastElementChild,
    rootMargin: "0px 0px 200px 0px",
    threshold: 1,
  },
};
const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        getSortApiFilm(SORT_BY);
  }
};
 
const observer = new IntersectionObserver(callback, options.intersectionObserver);













