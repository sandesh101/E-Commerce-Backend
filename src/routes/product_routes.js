const ProductRouter = require('express').Router();
const ProductController = require("./../controllers/product_controller");

ProductRouter.get("/", ProductController.fetchAllProduct);
ProductRouter.get("/category/:id", ProductController.fetchProductByCategory);
ProductRouter.post("/", ProductController.createProduct);

module.exports = ProductRouter;
