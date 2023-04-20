const categoryRouter = require("express").Router();
const categoryController = require("../controllers/category-controller");

categoryRouter
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.postCategory);
categoryRouter.route("/:id").put(categoryController.putCategory);

module.exports = categoryRouter;
