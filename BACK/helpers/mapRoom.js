const mongoose = require("mongoose");
const mapReviews = require("./mapReviews");

module.exports = function (room) {
  return {
    id: room._id,
    sysId: room.sys_id,
    title: room.title,
    imageUrl: room.image_url,
    content: room.content,
    price: room.price,
    reviews: room.reviews.map((review) =>
      mongoose.isObjectIdOrHexString(review) ? review : mapReviews(review)
    ),
  };
};
