const reviewCard = document.querySelectorAll('.review-card');

reviewCard.forEach((card) => {
  card.addEventListener('click', async (e) => {
    const movieId = e.currentTarget.getAttribute('data-id');
    window.location.replace(`/movie/${movieId}`);
  });
});
