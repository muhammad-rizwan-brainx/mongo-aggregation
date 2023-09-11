const express = require("express");
const productController = require("../controllers/productController");

const Router = express.Router();

Router.post("/", productController.addProduct);
Router.get("/", productController.getAllProducts);
Router.get("/:productID", productController.getProduct);
Router.patch("/:productID", productController.updateProduct);
Router.delete("/:productID", productController.deleteProduct);

module.exports = Router;