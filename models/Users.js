const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
userSchema.methods.validPassword = function(password) {
  return this.password === password;
};
userSchema.plugin(uniqueValidator);
const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
