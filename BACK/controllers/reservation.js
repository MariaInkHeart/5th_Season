const Reserv = require("../models/Reservation");

//add
async function addReserv(reserv) {
  const newReserv = await Reserv.create(reserv);

  return newReserv;
}

//edit
async function editReserv(id, reservData) {
  const newReserv = await Reserv.findByIdAndUpdate(id, reservData, {
    returnDocument: "after",
  });

  return newReserv;
}

//delete
function deleteReserv(id) {
  return Reserv.deleteOne({ _id: id });
}

//get all
function getReservs() {
  return Reserv.find();
}

module.exports = {
  addReserv,
  editReserv,
  deleteReserv,
  getReservs,
};
