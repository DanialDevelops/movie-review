const searchForm = document.querySelector('#search-form');
const searchResults = document.querySelector('#search-results');
const searchError = document.querySelector('#search-error');

async function addMovieToSession(movie) {
  try {
    const response = await fetch(`/api/movie/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });
    const savedMovie = await response.json();

    window.location.href = `/movie/${savedMovie.id}`;
  } catch (err) {
    console.error('Failed to add movie to session.');
  }
}

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector('#search-input').value.trim();
  const response = await fetch(`/api/movie/search/${searchInput}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  // Error message.
  searchError.textContent = '';
  if (response.status === 404) {
    searchError.textContent = 'No movies found.';
    return;
  }
  const movies = await response.json();

  // Remove previous search results.
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }

  // Display search results.
  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    const watchlistButton = document.createElement('button');
    movieCard.setAttribute('data-id', movie.id);
    movieCard.classList.add(
      'card',
      'col-2',
      'm-1',
      'd-flex',
      'flex-column',
      'justify-content-between'
    );

    let cardContent = `
      <img class='card-img-top' src='${movie.imageUrl}' alt='${movie.title}' />
      <div class='card-body'>
        <h5 class='card-title'>${movie.title}</h5>
      `;
    if (movie.avgRating) {
      cardContent += `<p class="card-text">Average rating: ${movie.avgRating}</p>`;
    }
    cardContent += `<p class="card-text">${movie.reviewsCount} reviews</p>
      </div>
      `;
    movieCard.innerHTML = cardContent;
    // for(let i = 0; i < watchlistDB.length; i++){
    //   if(movie.id === watchlistDB[i].movie_id){
    //     watchlistButton.textContent = 'Remove from Watchlist';
    //     return;
    //   }
    //   watchlistButton.textContent = 'Add to Watchlist';
    // }

    watchlistButton.textContent = 'Add to Watchlist';

    movieCard.appendChild(watchlistButton);
    searchResults.appendChild(movieCard);
    watchlistButton.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    movieCard.addEventListener('click', async (e) => {
      e.preventDefault();
      // Put selected movie in sessionStorage so we don't have to make another API call.
      addMovieToSession(movie);

      const movieId = e.currentTarget.getAttribute('data-id');
      window.location.replace(`/movie/${movieId}`);
    });
  });
});

// on the page load send ajax request to get all watchlist from the database
// this request will check if the user is logged in or not
// if logged in then send the data of watchlist as json (API route)
// after receiving the data, save in local storage
// after fetching movies api data then compared it to local storage data
