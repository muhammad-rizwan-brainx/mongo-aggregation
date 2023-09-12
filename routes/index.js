const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");

// router.use("/orders", orderRoutes);
// router.use("/products", productRoutes);
router.use("/user", userRoutes);


module.exports = router;