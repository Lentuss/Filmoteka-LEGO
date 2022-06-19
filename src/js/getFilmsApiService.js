import axios from 'axios';
import { API_KEY, SEARCH_URL, BASE_URL} from './apiVariables';

export default class GetFilmsApiService {
    constructor(url) {
        this.page = 1;
        this.period = 'day';
        this.searchRequest = "";
        this.url = url;
    }
    
    async getFilms() {
        let searchLink = null;
        try {
            
            if (this.url === SEARCH_URL) {
                searchLink = `${this.url}?api_key=${API_KEY}&page=${this.page}&query=${this.searchRequest}`;
            } else if (this.url === BASE_URL) {
                searchLink = `${BASE_URL}trending/all/${this.period}?api_key=${API_KEY}&page=${this.page}`;
            }
            
            const response = await axios.get(searchLink);
            const data = response.data;
            this.page += 1;
            return data;
            
        } catch(error) {
            console.log(error.message);
        }        
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