module.exports = {
  getAvgRating: (reviews) => {
    const avgRating = reviews.reduce((accumulator, review) => {
      const rating = review.rating;
      if (rating) return accumulator + rating;
    }, 0);

    return avgRating / reviews.length;
  },
  formatTimestamp: (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day}/${month}/${year}`;
  },
};
