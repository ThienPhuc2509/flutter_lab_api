const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const favoriteFoodSchema = new Schema({
  username: String,
  favoriteFood: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
});
const FavoriteFood = mongoose.model("FavoriteFood", favoriteFoodSchema);
FavoriteFood.createCollection();

module.exports = FavoriteFood;
