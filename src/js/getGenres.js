import { API_KEY, GENRES_URL } from './apiVariables';

export const getGenres = () => {
  return fetch(`${GENRES_URL}?api_key=${API_KEY}&language=en-US`);
};

export const getGenreById = async id => {
  try {
    const resp = await getGenres();
    const genres = await resp.json();
    const genresArray = genres.genres;
    genresArray.forEach(genre => {
      if (id === genre.id) {

        console.log(genre.name); //for test
        return genre.name;
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

//тест
getGenreById(12);
