const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
});

const Food = mongoose.model("Food", foodSchema);
Food.createCollection();

module.exports = Food;
