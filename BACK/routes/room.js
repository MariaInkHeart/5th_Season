const express = require("express");
const { getRoom, getRooms } = require("../controllers/room");
const mapRoom = require("../helpers/mapRoom");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const rooms = await getRooms();
  res.send({ data: { rooms: rooms.map(mapRoom) } });
});

router.get("/:id", async (req, res) => {
  const room = await getRoom(req.params.id);

  res.send({ data: mapRoom(room) });
});

module.exports = router;
