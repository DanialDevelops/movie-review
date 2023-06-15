module.exports = function getAvgRating(reviews) {
  if (!reviews.length) {
    return;
  }
  const avgRating = reviews.reduce((accumulator, review) => {
    const rating = review.rating;
    if (rating) return accumulator + rating;
  }, 0);

  return avgRating / reviews.length;
};
