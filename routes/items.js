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
    Item.find().then(items => {
      res.render("items/index", {
        items: items
      });
    });
  })

  .post(ensureAuthenticated, (req, res) => {
    let x = new Date(req.body.bid_date);
    console.log(req.body);
    console.log(x);
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

    req.flash(
      "success_msg",
      "Congrats, new Item Posted. Come back in a while to see all bids."
    );
    res.redirect(`items/show/${req.body.id}`);
  });

router.route("/show/:id").get((req, res) => {
  Item.findById(req.params.id)
    .populate("user")
    .populate("bids.user")
    .then(item => {
      res.render("items/show", {
        item: item
      });
    });
});

router.route("/my").get(ensureAuthenticated, (req, res) => {
  Item.find({ user: req.user.id })
    .sort({ bid_time: "desc" })
    .then(items => {
      res.render("items/my", {
        items: items
      });
    });
});
router.route("/addbid/:id").post(ensureAuthenticated, (req, res) => {
  Item.findById(req.params.id).then(item => {
    const newBid = {
      amount: req.body.amount,
      user: req.user.id
    };
    item.bids.unshift(newBid);
    item.save();
    req.flash("success_msg", "Your Bid was successfully placed");
    res.redirect(`/items/show/${req.params.id}`);
  });
});
router.get("/user/:userId", (req, res) => {
  Item.find({ user: req.params.userId })
    .populate("user")
    .then(items => {
      res.render("items/index", {
        items: items
      });
    });
});
router.route("/:id").delete(ensureAuthenticated, (req, res) => {
  Item.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Item Successfully deleted.");
    res.redirect("/dashboard");
  });
});
module.exports = router;
