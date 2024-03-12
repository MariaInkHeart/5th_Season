require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const port = 3001;
const app = express();

app.use(express.static("../FRONT/build"));

app.use(cookieParser());
app.use(express.json());

app.use("/", routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
