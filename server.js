const express = require("express");
const mongoose = require("mongoose");
const mongoURI = require("./config/keys");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
require("./models");
const users = require("./routes/users");
const items = require("./routes/items");
const index = require("./routes/index");

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

app.engine(
  "handlebars",
  exphbs({
    // helpers: {
    //   truncate: truncate,
    //   formatDate: formatDate,
    //   select: select
    // },
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(cookieParser());

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
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/users", users);
app.use("/items", items);
app.use("/", index);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Evesdropping on port ${port}..`);
});
