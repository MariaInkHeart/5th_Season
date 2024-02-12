const { verify } = require("../helpers/token");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    console.log("токена нет в куках");
  }

  const tokenData = verify(token);
  if (!tokenData) {
    console.log("токен не валидный");
  }

  const user = await User.findOne({ _id: tokenData.id });

  if (!user) {
    res.send({ error: "Authenticated user not found" });
    return;
  }

  req.user = user;
  next();
};
