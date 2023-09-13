const Product = require("../models/productModel");

const getAllProducts = () => {
  return Product.find().exec();
};

const addProduct = async (name, unitPrice, availableQuantity) => {
  const product = new Product({ 
    name,
    unitPrice,
    availableQuantity
  });
  return await product.save();
};

const getProduct = async (id) => {
  return await Product.findById(id).select("name unitPrice availableQuantity").exec();
};

const updateProduct = async (id, payload) => {
  return await Product.updateOne({ _id: id }, { $set: payload }).exec();
};

const deleteProduct = async (id) => {
  return await Product.deleteOne({ _id: id }).exec();
};

module.exports = {
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getAllProducts
}