// const movieName = 'Avengers';
// const imdbID = 'tt21361444';
require('dotenv').config();

async function getAllMovies(movieName) {
  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieName}?exact=false&titleType=movie`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.MOVIE_DB_KEY,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const { results } = await response.json();

    const formattedResults = results.reduce((accumulator, movie) => {
      // Exclude movie from search results if it has no title, poster image, or release year.
      if (movie.titleText && movie.primaryImage && movie.releaseYear) {
        // Destructure to get just the id, title, poster image, and release year.
        const {
          id,
          titleText: { text: title },
          primaryImage: { url: imageUrl },
          releaseYear: { year: releaseYear },
        } = movie;
        // Return a filtered and reformatted array of movie objects.
        accumulator.push({
          id,
          title,
          imageUrl,
          releaseYear,
        });
      }

      return accumulator;
    }, []);

    return formattedResults;
  } catch (err) {
    throw new Error(err);
  }
}

async function getMovie(imdbID) {
  const url = `https://moviesdatabase.p.rapidapi.com/titles/${imdbID}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.MOVIE_DB_KEY,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options, imdbID);
    const { results } = await response.json();
    if (!(results.titleText && results.primaryImage && results.releaseYear)) {
      return null;
    }

    const {
      id,
      titleText: { text: title },
      primaryImage: { url: imageUrl },
      releaseYear: { year: releaseYear },
    } = results;

    return { id, title, imageUrl, releaseYear };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { getAllMovies, getMovie };
