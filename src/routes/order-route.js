const orderRouter = require("express").Router();
const orderController = require("../controllers/order-controller");

orderRouter.get("/:id", orderController.getOrders);
orderRouter.post("/", orderController.createOrders);
orderRouter.post("/checkout", orderController.checkout);
orderRouter.post("/remove-item", orderController.removeItem);
orderRouter.post("/sum", orderController.sumOrder);
orderRouter.post("/get-checkout", orderController.getCheckout);
module.exports = orderRouter;
