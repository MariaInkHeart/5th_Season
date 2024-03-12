module.exports = function (reservation) {
  return {
    userLogin: reservation.userLogin,
    roomId: reservation.roomId,
    options: reservation.options,
    arrivalDate: reservation.arrivalDate,
    leavingDate: reservation.leavingDate,
    roomPrice: reservation.price,
    id: reservation._id,
  };
};
