const searchForm = document.querySelector('#search-form');
const searchResults = document.querySelector('#search-results');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector('#search-input').value.trim();
  const response = await fetch(`/api/movie/search/${searchInput}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const movies = await response.json();

  // Remove previous search results.
  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }

  // Display search results.
  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.setAttribute('data-id', movie.id);
    movieCard.classList.add('card', 'col-3', 'm-1');

    let cardContent = `
      <img class='card-img-top' src='${movie.imageUrl}' alt='${movie.title}' />
      <div class='card-body'>
        <h5 class='card-title'>${movie.title}</h5>
      `;
    if (movie.avgRating) {
      cardContent += `<p class="card-text">Average Rating: ${movie.avgRating}</p>`;
    }
    cardContent += `<p class="card-text">Reviews: ${movie.reviewsCount}</p>
      </div>
      `;
    movieCard.innerHTML = cardContent;

    searchResults.appendChild(movieCard);
    movieCard.addEventListener('click', async (e) => {
      e.preventDefault();
      // Put selected movie in localStorage so we don't have to make another API call.
      localStorage.setItem('selectedMovie', JSON.stringify(movie));
      const movieId = e.currentTarget.getAttribute('data-id');
      window.location.replace(`/movie/${movieId}`);
    });
  });
});
