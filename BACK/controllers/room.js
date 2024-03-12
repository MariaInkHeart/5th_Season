const Room = require("../models/Room");

//get list
function getRooms() {
  return Room.find();
}

//get item
function getRoom(id) {
  return Room.findById(id).populate({ path: "reviews", populate: "author" });
}

module.exports = {
  getRoom,
  getRooms,
};
