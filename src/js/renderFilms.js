import { IMAGE_URL } from './apiVariables';
import { getGenres } from './getGenres';

export function createListMarkup(requestedFilms) {
    
    const allGenresArr = getGenres();
    
    return requestedFilms.results.map(({ id, poster_path, original_title, original_name, genre_ids, release_date, first_air_date, vote_average }) => {
        
        // Жанри
        const genreNamesArr = [];
        const genresForRender = [];
        
        allGenresArr.map(genre => {
            if (genre_ids.includes(genre.id)) {
                genreNamesArr.push(genre.name);
            }
        })
        
        const [fisrGenre, secondGenre, ...Others] = genreNamesArr;
        
        if (genreNamesArr.length > 2) {
            genresForRender.push(fisrGenre, secondGenre, "Other");

        } else if (genreNamesArr.length === 2) { 
            genresForRender.push(fisrGenre, secondGenre);
        } else if (genreNamesArr.length === 1) {
            genresForRender.push(fisrGenre);
        } else {
            genresForRender.push("Unknown");
        }

        // Назва


        let name = '';

        if (original_title) {
          name = original_title;
        } else {

            name = original_name;
        };
        
        // Дата
        let date = '';

        if (release_date !== undefined) {
          date = release_date.slice(0, 4);
        } else if (first_air_date) {
          date = first_air_date.slice(0, 4);
        } else {
          date = 'Unknown';
        }

        // Постер
        let posterPicture = `${IMAGE_URL + poster_path}`;
        if (poster_path === null) {
          posterPicture =
            'https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg';
        }

        return `
        <li class="main__movie-card-item" data-movieId="${id}">
        <img class="main__movie-img" src="${posterPicture}" alt="${original_title}">
        <div class="main__movie-info">
        <h2 class="main__movie-title">${name}</h2>
        <p class="main__movie-genre">${genresForRender.join(', ')}<span class="main__movie-year">${date}</span></p>
        <p class="main__movie-raiting">${vote_average}</p>
        </div>
        </li>
        `;
      }
    )
    .join('');
}
