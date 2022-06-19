import { SEARCH_URL } from "./apiVariables";
import GetFilmsApiService from './getFilmsApiService';
import { createListMarkup } from './renderFilms';
import { getTrendFilms } from "./getTrendFilms";

const movieAPIService = new GetFilmsApiService();

const galleryEl = document.querySelector('.main__movie-card-list');
const formEl = document.querySelector('.header-form');
const mainBtnsEls = document.querySelector('.main__button-list');
const loaderEl = document.querySelector('.loader');
const failedSearch = document.querySelector('.search-error');

formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
    e.preventDefault();
    
    cleanMarkup();

    galleryEl.insertAdjacentHTML('beforeend',`<div class="loader"></div>`);
    loaderEl.style.display = "block";
    movieAPIService.query = e.currentTarget.elements.searchQuery.value;
    e.currentTarget.elements.searchQuery.value = "";
    getFilms();
}

async function getFilms() {
    try {

        if (movieAPIService.query !== "") {
            const movieFromApi = await movieAPIService.getFilms(SEARCH_URL);
           
            if (movieFromApi.total_results === 0) {

                loaderEl.style.display = "none";
                mainBtnsEls.style.display = "flex";
                failedSearch.classList.remove("visually-hidden");
                getTrendFilms();

            } else {

                onGetSucces(movieFromApi);

            }
            
        } else {

            mainBtnsEls.style.display = "flex";
            loaderEl.style.display = "none";
            failedSearch.classList.remove("visually-hidden");
            getTrendFilms();

        }

    } catch (error) {
        console.log(error.message);
    }
    
}

function onGetSucces(movieFromApi) {

    const movieForRender = createListMarkup(movieFromApi);
    
    failedSearch.classList.add("visually-hidden");
    mainBtnsEls.style.display = "none";
    loaderEl.style.display = "none";

    observer.observe(galleryEl.lastElementChild);

    galleryEl.insertAdjacentHTML('beforeend', movieForRender);

    observer.observe(galleryEl.lastElementChild);
}

function cleanMarkup() {
    galleryEl.innerHTML = "";
}

// infinite scroll

const options = {
  intersectionObserver: {
    root: galleryEl.lastElementChild,
    rootMargin: "0px 0px 200px 0px",
    threshold: 1,
  },
};

const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        getFilms(); 
  }
};
 
const observer = new IntersectionObserver(callback, options.intersectionObserver);