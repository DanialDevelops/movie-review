const watchlistCard = document.querySelectorAll('.movie-card');

watchlistCard.forEach((card) => {
  card.addEventListener('click', async (e) => {
    const movieId = e.currentTarget.getAttribute('data-id');
    window.location.replace(`/movie/${movieId}`);
  });
});
