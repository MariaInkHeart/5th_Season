const mongoose = require("mongoose");
const validator = require("validator");

const RoomSchema = mongoose.Schema(
  {
    sys_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Image should be a valid url",
      },
    },
    content: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
