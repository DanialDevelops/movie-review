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
    movieCard.innerHTML = `
    <img class='card-img-top' src='${movie.imageUrl}' alt='${movie.title}' />
        <div class='card-body'>
            <h5 class='card-title'>${movie.title}</h5>
            <p class="card-text">Average Rating: ${movie.avgRating}</p>
            <p class="card-text">Reviews: ${movie.reviewsCount}</p>
        </div>
        `;
    searchResults.appendChild(movieCard);
    movieCard.addEventListener('click', async (e) => {
      e.preventDefault();
      const movieId = e.currentTarget.getAttribute('data-id');
      window.location.replace(`/movie/${movieId}`);
    });
  });
});
