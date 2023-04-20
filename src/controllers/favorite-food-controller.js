const FavoriteFood = require("../model/FavoriteFood");
const User = require("../model/User");

class favController {
  getFav = async (req, res) => {
    const username = req.body.username;
    const fav = await FavoriteFood.findOne({ username: username })
      .populate("favoriteFood")
      .lean();
    console.log(fav);
    return res.status(200).json({ status: true, data: { favorite: fav } });
  };
  addFav = async (req, res) => {
    const username = req.body.username;
    const foodId = req.body.foodId;
    const fav = await FavoriteFood.findOne({ username: username });
    if (!fav) {
      const newFav = await FavoriteFood.create({
        username: username,
        favoriteFood: foodId,
      });
      const result = await newFav.save();
      if (!result) return res.status(503).json({ status: false });
      return res
        .status(200)
        .json({ status: true, data: { favoriteFood: result } });
    }
    function checkObjectIdInArray(x, array) {
      return array.includes(x.toString());
    }
    const isFav = await checkObjectIdInArray(foodId, fav.favoriteFood);
    console.log(isFav);
    if (isFav) {
      const resultFav = await FavoriteFood.findOneAndUpdate(
        { username: username },
        { $pull: { favoriteFood: foodId } },
        { new: true }
      );
      console.log(resultFav);
      return res.status(200).json({ status: true, del: 1 });
    }
    const resultFav = await FavoriteFood.findOneAndUpdate(
      { username: username },
      { $push: { favoriteFood: { _id: foodId } } },
      { new: true }
    );
    return res.status(200).json({ status: true, del: 0 });
    //return res.status(200).json({ status: true, data: { favoriteFood: fav } });
  };
  removeFav = async (req, res) => {
    const username = req.body.username;
    const fav = await FavoriteFood.findOne({ username: username });
  };

  isFav = async (req, res) => {
    const username = req.body.username;
    const foodId = req.body.foodId;

    let fav = await FavoriteFood.findOne({ username: username });
    if (!fav) {
      const newCreFav = await FavoriteFood.create({
        username: username,
        favoriteFood: [],
      });
      const newFav = await newCreFav.save();
      fav = newFav;
    }
    function checkObjectIdInArray(x, array) {
      return array.includes(x.toString());
    }
    const isFav = await checkObjectIdInArray(foodId, fav.favoriteFood);
    if (!isFav) return res.status(200).json({ status: true, isFav: 0 });
    return res.status(200).json({ status: true, isFav: 1 });
  };
}

module.exports = new favController();
