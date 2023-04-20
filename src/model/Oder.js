const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  username: String,
  address: {
    type: String,
    nullable: true,
  },
  createOnDate: Date,
  total: {
    type: Number,
    nullable: true,
    default: 0,
  },
  orderDetail: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  status: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);
Order.createCollection();

module.exports = Order;
