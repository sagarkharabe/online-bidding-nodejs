const express = require("express");
const mongoose = require("mongoose");
const router = express();
const Item = mongoose.model("Items");
const { ensureAuthenticated } = require("../helpers/auth");
router.route("/add").get(ensureAuthenticated, (req, res) => {
  res.render("items/add");
});

router
  .route("/")
  .get((req, res) => {
    res.render("items/index");
  })

  .post(ensureAuthenticated, (req, res) => {
    let x = new Date(req.body.bid_date);
    const newItem = new Item({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      user: req.user.id,
      status: req.body.status,
      bid_time: x
    });
    newItem.save(err => {
      console.log(err);
    });

    res.redirect(`items/show/${req.body.id}`);
  });

router.route("/show/:id").get(ensureAuthenticated, (req, res) => {
  res.send(`show a item  ${req.params.id}`);
});

module.exports = router;
