const express = require("express");
const mongoose = require("mongoose");
const mongoURI = require("./config/keys");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

require("./models");
const users = require("./routes/users");

require("./config/passport")(passport);

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to Mlab..");
  })
  .catch(err => console.log(err));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Evesdropping on port ${port}..`);
});
