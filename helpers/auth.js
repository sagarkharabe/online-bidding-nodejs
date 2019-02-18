module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Your have to be logged in to perform that action.");
    res.redirect("/");
  }
};
