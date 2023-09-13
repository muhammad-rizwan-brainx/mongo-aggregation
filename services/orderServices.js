const Order = require("../models/orderModel");

const getAllOrders = () => {
  return Order.find();
};

const addOrder = async (user,products) => {
  const order = new Order({ 
    user,
    products
  });
  return await order.save();
};

const getOrder = async (id) => {
  return await Order.findById(id).select("user products");
};

const updateOrder = async (id, payload) => {
  return await Order.updateOne({ _id: id }, { $set: payload });
};

const deleteOrder = async (id) => {
  return await Order.deleteOne({ _id: id }).exec();
};

module.exports = {
    addOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    getAllOrders
}