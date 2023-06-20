require('dotenv').config();
const axios = require('axios');

async function getAllMovies(movieName) {
  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieName}?exact=false&titleType=movie`;
  const options = {
    headers: {
      'X-RapidAPI-Key': process.env.MOVIE_DB_KEY,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.get(url, options);
    const { results } = response.data;

    const formattedResults = results.reduce((accumulator, movie) => {
      if (movie.titleText && movie.primaryImage && movie.releaseYear) {
        const {
          id,
          titleText: { text: title },
          primaryImage: { url: imageUrl },
          releaseYear: { year: releaseYear },
        } = movie;

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
    headers: {
      'X-RapidAPI-Key': process.env.MOVIE_DB_KEY,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.get(url, options);
    const { results } = response.data;

    if (!results) {
      return;
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
