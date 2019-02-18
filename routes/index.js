const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Item = mongoose.model("Items");
const { ensureAuthenticated } = require("../helpers/auth");
router.route("/").get((req, res) => {
  res.render("index/welcome");
});
router.route("/about").get((req, res) => {
  res.render("index/about");
});

router.route("/dashboard").get(ensureAuthenticated, (req, res) => {
  Item.find({ user: req.user.id }).then(items => {
    res.render("index/dashboard", {
      items: items
    });
  });
});

router.route("/about").get((req, res) => {
  res.send("index/about");
});
module.exports = router;
