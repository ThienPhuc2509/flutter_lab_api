const favRouter = require("express").Router();
const favController = require("../controllers/favorite-food-controller");

favRouter.post("/", favController.getFav);
favRouter.post("/add", favController.addFav);
favRouter.post("/remove/:id/:foodId", favController.removeFav);
favRouter.post("/isFav", favController.isFav);

module.exports = favRouter;
