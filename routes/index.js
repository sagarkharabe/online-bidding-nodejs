const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Item = mongoose.model("Items");

router.route("/").get((req, res) => {
  res.render("index/welcome");
});
router.route('/about').get((req,res){
  res.render('index/about')
})

module.exports = router;
