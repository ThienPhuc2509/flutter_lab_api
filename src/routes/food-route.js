const foodRouter = require("express").Router();
const foodController = require("../controllers/food-controller");

foodRouter
  .route("/")
  .get(foodController.getFoods)
  .post(foodController.postFood);
foodRouter
  .route("/:id")
  .put(foodController.putFoods)
  .delete(foodController.delFood);

module.exports = foodRouter;
