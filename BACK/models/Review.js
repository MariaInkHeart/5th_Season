const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
