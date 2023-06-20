const reviewBtn = document.querySelector('#review-btn');
const reviewText = document.querySelector('#review-text');
const movieId = document.querySelector('#movie-card').getAttribute('data-id');

reviewText.addEventListener('input', () => {
  reviewText.classList.remove('is-invalid');
});

reviewBtn.addEventListener('click', async (e) => {
  if (!reviewText.value.trim()) {
    reviewText.classList.add('is-invalid');
    return;
  }

  const rating = document.querySelector(
    'input[name="inlineRadioOptions"]:checked'
  ).value;

  const response = await axios.post('/api/review', {
    content: reviewText.value.trim(),
    rating: rating,
    imdb_id: movieId,
  });

  if (response.status === 201) {
    await axios.delete('/api/movie/session');
    window.location.replace(`/movie/${movieId}`);
  } else {
    document.location.replace('/');
  }
});
