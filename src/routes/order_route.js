const OrderRouter = require("express").Router();
const OrderController = require("./../controllers/order_controller");

OrderRouter.get("/:userId", OrderController.fetchOrderForUser);
OrderRouter.post("/", OrderController.createOrder);
OrderRouter.post("/updateStatus", OrderController.updateOrderStatus);

module.exports = OrderRouter;
