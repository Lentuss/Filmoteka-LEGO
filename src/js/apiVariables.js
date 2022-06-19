let period = 'day'; //убрать
let id = ''; //убрать

const API_KEY = 'b19e6b2986fc1ae4c290daa4cefec337';
const BASE_URL = 'https://api.themoviedb.org/3/';
const TREND_URL = `${BASE_URL}trending/all/${period}`;
const SEARCH_URL = `${BASE_URL}search/movie`;
const DETAILS_URL = `${BASE_URL}movie/${id}`;
const GENRES_URL = `${BASE_URL}genre/movie/list`;
const IMAGE_URL = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/`;
const BACKDROP_URL = `https://image.tmdb.org/t/p/original/`;

export {
  API_KEY,
  BASE_URL,
  TREND_URL,
  SEARCH_URL,
  DETAILS_URL,
  GENRES_URL,
  IMAGE_URL,
  BACKDROP_URL,
};
