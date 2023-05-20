const CartRouter = require("express").Router();
const CartController = require("./../controllers/cart_controller");

CartRouter.post("/", CartController.addToCart);

module.exports = CartRouter;
