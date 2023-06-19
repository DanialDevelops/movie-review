module.exports = {
  getAvgRating: (reviews) => {
    const avgRating = reviews.reduce((accumulator, review) => {
      const rating = review.rating;
      if (rating) return accumulator + rating;
    }, 0);

    return avgRating / reviews.length;
  },
};
