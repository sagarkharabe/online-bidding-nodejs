const express = require("express");
const mongoose = require("mongoose");
const router = express();
const User = mongoose.model("Users");
const passport = require("passport");
const { ensureAuthenticated } = require("../helpers/auth");
router
  .route("/register")
  .get((req, res) => {
    res.render("users/register");
  })
  .post((req, res) => {
    console.log(req.body);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    newUser.save(err => {
      if (err && err.name == "ValidationError") {
        console.log(err);
        res.redirect("/users/register");
      } else res.redirect("/users/login");
    });
  });
router
  .route("/login")
  .get((req, res) => {
    res.render("users/login");
  })
  .post((req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login"
    })(req, res, next);
  });

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
