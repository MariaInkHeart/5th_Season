const express = require("express");
const {
  addReserv,
  deleteReserv,
  editReserv,
  getReservs,
} = require("../controllers/reservation");
const mapReservation = require("../helpers/mapReservation");
const authenticated = require("../middlewares/authenticated");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, async (req, res) => {
  const reservs = await getReservs();
  res.send({ data: { reservs: reservs.map(mapReservation) } });
});

router.post("/", authenticated, async (req, res) => {
  const newReservation = await addReserv({
    userLogin: req.body.userLogin,
    roomId: req.body.roomName,
    options: req.body.options,
    arrivalDate: req.body.arrivalDate,
    leavingDate: req.body.leavingDate,
    price: req.body.roomPrice,
  });

  res.send({ data: mapReservation(newReservation) });
});

router.delete("/:id", authenticated, async (req, res) => {
  await deleteReserv(req.params.id);

  res.send({ error: null });
});

router.patch("/:id", authenticated, async (req, res) => {
  const newReserv = await editReserv(req.params.id, {
    options: req.body.editedOptions,
    arrivalDate: req.body.editedArrivalDate,
    leavingDate: req.body.editedLeavingDate,
  });

  res.send({ data: mapReservation(newReserv) });
});

module.exports = router;
