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
    const newItem = new Item({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      user: req.user.id,
      status: req.body.status,
      bid_time: x
    });
    newItem.save().then(newItem => {
      req.flash(
        "success_msg",
        "Congrats, new Item Posted. Come back in a while to see all bids."
      );
      res.redirect(`items/show/${newItem._id}`);
    });
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

router.route("/edit/:id").get(ensureAuthenticated, (req, res) => {
  Item.findOne({ _id: req.params.id }).then(Item => {
    if (req.user.id == Item.user) {
      res.render("items/edit", {
        item: Item
      });
    } else {
      req.flash("error_msg", "Not Authorized");
      res.redirect("/dashboard");
    }
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
router
  .route("/:id")
  .delete(ensureAuthenticated, (req, res) => {
    Item.remove({ _id: req.params.id }).then(() => {
      req.flash("success_msg", "Item Successfully deleted.");
      res.redirect("/dashboard");
    });
  })
  .put(ensureAuthenticated, (req, res) => {
    Item.findById(req.params.id).then(item => {
      let x = new Date(req.body.bid_date);

      (item.name = req.body.name),
        (item.image = req.body.image),
        (item.description = req.body.description),
        (item.user = req.user.id),
        (item.status = req.body.status),
        (item.bid_time = x);

      item.save().then(item => {
        req.flash("success_msg", "Changes saved successfully");
        res.redirect(`/items/show/${item._id}`);
      });
    });
  });
module.exports = router;
