import axios from 'axios';
import { API_KEY } from './apiVariables';
export default class GetFilmsApiService {
    constructor() {
        this.page = 1;
        this.period = 'day';
        this.searchRequest = "";
    }
    
    async getTrendFilms(url) {
        try {
            const searchLink = `${url}trending/movie/${this.period}?api_key=${API_KEY}&page=${this.page}`;
            return await this.queryFilms(searchLink);
        } catch(error) {
            console.log(error.message);
        }        
    }
    async getSearchedFilms(url) {
        try {
            const searchLink = `${url}?api_key=${API_KEY}&page=${this.page}&query=${this.searchRequest}`;
            return await this.queryFilms(searchLink);
        } catch(error) {
            console.log(error.message);
        }        
    }
    
    async queryFilms(searchLink) {
        const response = await axios.get(searchLink);
        const data = response.data;
        this.page += 1;
        return data;
    }
    resetPage() {
        this.page = 1;
    };
    trendsOfDay() {
        this.period = 'day';
    };
    trendsOfWeek() {
        this.period = 'week';
    };
      get query() {
        return this.searchRequest;
    };
    set query(newQuery) {
        this.searchRequest = newQuery;
    };
}