const express = require("express");
const { getRoom, getRooms } = require("../controllers/room");
const mapRoom = require("../helpers/mapRoom");
const { addReview } = require("../controllers/review");
const mapReviews = require("../helpers/mapReviews");
const { deleteReview } = require("../controllers/review");
const authenticated = require("../middlewares/authenticated");
const ROLES = require("../constants/roles");
const hasRole = require("../middlewares/hasRole");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const rooms = await getRooms();
  res.send({ data: rooms.map(mapRoom) });
});

router.get("/:id", async (req, res) => {
  const room = await getRoom(req.params.id);
  res.send({ data: mapRoom(room) });
});

router.post("/:id/reviews", authenticated, async (req, res) => {
  const newReview = await addReview(req.params.id, {
    content: req.body.content,
    author: req.body.author,
  });

  res.send({ data: mapReviews(newReview) });
});

router.delete(
  "/:roomId/reviews/:reviewsId",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteReview(req.params.roomId, req.params.reviewsId);

    res.send({ error: null });
  }
);

module.exports = router;
