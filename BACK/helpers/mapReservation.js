module.exports = function (reservation) {
  return {
    userLogin: reservation.userLogin,
    roomId: reservation.roomId,
    options: reservation.options,
    arrivalDate: reservation.arrivalDate,
    leavingDate: reservation.leavingDate,
    id: reservation._id,
  };
};
