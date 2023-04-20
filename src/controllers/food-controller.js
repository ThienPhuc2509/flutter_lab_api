const Food = require("../model/Food");
const fs = require("fs");
class FoodController {
  // GET all foods
  getFoods = async (req, res) => {
    try {
      const foods = await Food.find();
      if (!foods || foods.length == 0) {
        return res.status(404).json({ status: false });
      }
      // fs.appendFileSync("src/public/st.txt", "My Text \n", "UTF-8", {
      //   flags: "a+",
      // });
      return res.status(200).json({ status: true, data: { foods } });
    } catch (err) {
      return res.status(503).json({ status: false });
    }
  };

  // POST create food
  postFood = async (req, res) => {
    const food = new Food({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    });
    try {
      const savedFood = await food.save();
      return res.status(200).json({ status: true, data: { food: savedFood } });
    } catch (err) {
      return res.status(503).json({ status: false });
    }
  };

  //PUT update food
  putFoods = async (req, res) => {
    const foodId = req.params.id;
    console.log(typeof req.body.price);
    try {
      const updatedFood = await Food.findOneAndUpdate(
        { _id: foodId },
        {
          title: req.body.title,
          description: req.body.description,
          price: +req.body.price,
          image: req.body.image,
        },
        { new: true }
      );
      if (!updatedFood) {
        console.log(updatedFood);
        return res.status(404).json({ status: false });
      }
      return res
        .status(200)
        .json({ status: true, data: { food: updatedFood } });
    } catch (err) {
      console.log(err);
      return res.status(503).json({ status: false });
    }
  };

  //DEL delete food
  delFood = async (req, res) => {
    const foodId = req.params.id;
    try {
      const delFood = await Food.findByIdAndRemove({ _id: foodId });
      if (!delFood) {
        console.log(delFood);
        return res.status(404).json({ status: false });
      }
      return res.status(200).json({ status: true });
    } catch (err) {
      console.log(err);
      return res.status(503).json({ status: false });
    }
  };
}

module.exports = new FoodController();
