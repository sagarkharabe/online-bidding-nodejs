const express = require("express");
const mongoose = require("mongoose");
const mongoURI = require("./config/keys");

const app = express();

require("./models");
const users = require("./routes/users");
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to Mlab..");
  })
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Evesdropping on port ${port}..`);
});
