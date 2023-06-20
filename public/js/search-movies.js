const searchForm = document.querySelector('#search-form');
const searchResults = document.querySelector('#search-results');
const searchError = document.querySelector('#search-error');
const searchField = document.querySelector('#search-input');

async function isLoggedIn() {
  try {
    const response = await axios.get('/api/user/status');
    const { logged_in } = response.data;
    return logged_in || false;
  } catch (err) {
    console.error('Failed to check if user is logged in.', err);
    return false;
  }
}

async function addMovieToSession(movie) {
  try {
    const response = await axios.post('/api/movie/session', movie);
    const savedMovie = response.data;

    window.location.href = `/movie/${savedMovie.id}`;
  } catch (err) {
    console.error('Failed to add movie to session.');
  }
}

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Reset page.
  searchError.textContent = '';
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }

  const searchInput = document.querySelector('#search-input').value.trim();
  if (!searchInput) {
    searchField.classList.add('is-invalid');
    return;
  }

  try {
    const response = await axios.get(`/api/movie/search/${searchInput}`);
    const movies = response.data;

    // Error message if no movies found.
    if (response.status === 404) {
      searchError.textContent = 'No movies found. Try again!';
      return;
    }

    // Display search results.
    movies.forEach(async (movie) => {
      const movieCard = document.createElement('div');
      movieCard.setAttribute('data-id', movie.id);
      movieCard.classList.add(
        'card',
        'col-5',
        'm-1',
        'd-flex',
        'flex-column',
        'justify-content-between',
        'align-items-center',
        'movie-card'
      );

      let cardContent = `
        <img class='card-img-top img-thumbnail' style='height: 420' src='${movie.imageUrl}' alt='${movie.title}' />
        <div class='card-body text-center'>
          <h5 class='card-title my-2'>${movie.title}</h5>
      `;
      if (movie.avgRating) {
        cardContent += `<p class="card-text"><span class='detail'>Average rating:</span> ${movie.avgRating}</p>`;
      }
      cardContent += `<p class="card-text">${movie.reviewsCount} <span class='detail'>reviews</span></p>
        </div>
      `;
      movieCard.innerHTML = cardContent;

      // Append watchlist btn if user is logged in.
      if (await isLoggedIn()) {
        const watchlistButton = document.createElement('button');
        watchlistButton.textContent = 'Add to watchlist';
        watchlistButton.classList.add(
          'btn',
          'btn-success',
          'mb-3',
          'watchlist-btn'
        );
        movieCard.appendChild(watchlistButton);

        watchlistButton.addEventListener('click', async (e) => {
          e.stopPropagation();
          const movieId = e.currentTarget.getAttribute('data-id');
          const response = await axios.post('/api/watchlist', {
            imdb_id: movieId,
          });
          if (response.status === 200) {
            document.location.replace('/watchlist');
          } else {
            document.location.replace('/');
          }
        });
      }

      searchResults.appendChild(movieCard);

      movieCard.addEventListener('click', async (e) => {
        e.preventDefault();
        const movieId = e.currentTarget.getAttribute('data-id');

        // Put selected movie in session storage so we don't have to make another API call.
        addMovieToSession(movie);

        if (await isLoggedIn()) {
          window.location.replace(`/movie/${movieId}`);
        } else {
          searchError.textContent =
            'Please log in to view movie details, add movies to your watchlist, and read reviews.';
        }
      });
    });
  } catch (err) {
    searchError.textContent = 'Search failed. Try again!';
  }
});

searchField.addEventListener('input', () => {
  searchField.classList.remove('is-invalid');
});
