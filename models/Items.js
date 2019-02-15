const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  description: { type: String, require: true },
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  status: String,
  bid_time: {
    type: Date,
    require: true
  },
  bids: [
    {
      user: { type: Schema.Types.ObjectId, ref: "Users" },
      amount: {
        type: Number,
        require: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const itemModel = mongoose.model("Items", itemSchema);
