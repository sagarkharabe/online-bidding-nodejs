const express = require("express");
const mongoose = require("mongoose");
const router = express();
const Item = mongoose.model("Items");

router
  .route("/add")
  .get((req, res) => {
    res.send("add Item for bidding form");
  })
  .post((req, res) => {
    let x = new Date(
      req.body.bid_year,
      req.body.bid_month,
      req.body.bid_date,
      req.body.bid_hours,
      0,
      0,
      0
    );

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

router.route("/show/:id").get((req, res) => {
  res.send(`show a item  ${req.params.id}`);
});

module.exports = router;
