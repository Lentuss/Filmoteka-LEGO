import { API_KEY, BASE_URL } from './apiVariables';
import { selectedGenre } from './getFiler';
import { selectedYear } from './getFiler';

export default class MovieFilter {
  constructor() {
    this.page = 1;
  }
 async sortByGenre() {
    const response = await fetch(
        `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=`+ encodeURI(selectedGenre)+`&primary_release_year=`+ encodeURI(selectedYear)+`&page=${this.page}`)
        this.page += 1;    
        return response;
}  
  resetPage() {
    this.page = 1;
  }
}