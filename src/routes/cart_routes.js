const CartRouter = require("express").Router();
const CartController = require("./../controllers/cart_controller");

CartRouter.get("/:user", CartController.getCartForUser);
CartRouter.post("/", CartController.addToCart);
CartRouter.delete("/", CartController.removeCart);

module.exports = CartRouter;
