const foodRouter = require("./food-route");
const userRouter = require("./user-route");
const orderRouter = require("./order-route");
const categoryRouter = require("./category-route");
const favRouter = require("./favorite-food-route");
const notiRouter = require("./noti-route");

function initRouter(app) {
  app.use("/api/food", foodRouter);
  app.use("/api/user", userRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/fav", favRouter);
  app.use("/api/noti", notiRouter);
}

module.exports = initRouter;
