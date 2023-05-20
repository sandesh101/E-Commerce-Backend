const CategoryRoutes = require("express").Router();
const CategoryController = require("./../controllers/category_controller");

CategoryRoutes.get("/", CategoryController.fetchAllCategory);
CategoryRoutes.get("/:id", CategoryController.fetchCategoryById);
CategoryRoutes.post("/", CategoryController.createCategory);
    

module.exports = CategoryRoutes;