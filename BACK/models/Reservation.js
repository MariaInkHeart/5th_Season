const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userLogin: {
    type: String,
  },
  roomId: {
    type: String,
    required: true,
  },
  options: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: String,
    required: true,
  },
  leavingDate: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;
