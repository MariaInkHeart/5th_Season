require("dotenv").config();
const jwt = require("jsonwebtoken");

const sign = process.env.JWT_SECRET;

module.exports = {
  generate(data) {
    return jwt.sign(data, sign, { expiresIn: "30d" });
  },
  verify(token) {
    try {
      const user = jwt.verify(token, sign);
      return user;
    } catch (e) {
      return null;
    }
  },
};
