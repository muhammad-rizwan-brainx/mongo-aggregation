const express = require("express");
const orderController = require("../controllers/orderController");

const Router = express.Router();

Router.post("/",orderController.addOrder);
Router.get("/", orderController.getAllOrders);
Router.get("/:orderID", orderController.getOrder);
Router.patch("/:orderID", orderController.updateOrder);
Router.delete("/:orderID", orderController.deleteOrder);

module.exports = Router;