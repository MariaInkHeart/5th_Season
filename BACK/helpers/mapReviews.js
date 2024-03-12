module.exports = function (review) {
  return {
    content: review.content,
    author: review.author,
    id: review._id,
    publishedAt: review.createdAt.toLocaleString("ru", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
};
