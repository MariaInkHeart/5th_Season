require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  register,
  login,
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("./controllers/user");
const { getRoom, getRooms } = require("./controllers/room");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const ROLES = require("./constants/roles");
const {
  addReserv,
  deleteReserv,
  editReserv,
  getReservs,
} = require("./controllers/reservation");
const mapRoom = require("./helpers/mapRoom");
const mapReservation = require("./helpers/mapReservation");

const port = 3001;
const app = express();

app.use(express.static("../FRONT/build"));

app.use(cookieParser());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

app.get("/rooms", async (req, res) => {
  const rooms = await getRooms();
  res.send({ data: { rooms: rooms.map(mapRoom) } });
});

app.get("/rooms/:id", async (req, res) => {
  const room = await getRoom(req.params.id);

  res.send({ data: mapRoom(room) });
});

app.get("/reservations", async (req, res) => {
  const reservs = await getReservs();
  res.send({ data: { reservs: reservs.map(mapReservation) } });
});

app.use(authenticated);

app.post("/reservations", async (req, res) => {
  const newReservation = await addReserv({
    userLogin: req.body.userLogin,
    roomId: req.body.roomId,
    options: req.body.options,
    arrivalDate: req.body.arrivalDate,
    leavingDate: req.body.leavingDate,
  });

  res.send({ data: mapReservation(newReservation) });
});

app.delete("/reservations/:id", async (req, res) => {
  await deleteReserv(req.params.id);

  res.send({ error: null });
});

app.patch("/reservations/:id", async (req, res) => {
  const newReserv = await editReserv(req.params.id, {
    options: req.body.editedOptions,
    arrivalDate: req.body.editedArrivalDate,
    leavingDate: req.body.editedLeavingDate,
  });

  res.send({ data: mapReservation(newReserv) });
});

app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = getRoles();

  res.send({ data: roles });
});

app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newUser) });
});

app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
