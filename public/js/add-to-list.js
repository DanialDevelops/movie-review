const addBtn = document.querySelectorAll('.watchlist-btn');

addBtn.forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    alert('hi');
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
});
