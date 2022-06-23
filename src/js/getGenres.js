import allGenres from '../data/genres.json';

export function getGenres() {
  const { genres } = allGenres;
  return genres;
}

export const getGenreById = async id => {
  try {
    const resp = await getGenres();
    const genres = await resp.json();
    const genresArray = genres.genres;
    genresArray.forEach(genre => {
      if (id === genre.id) {
        return genre.name;
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
