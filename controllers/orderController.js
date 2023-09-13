const orderServices = require("../services/orderServices");
const root = process.env.ROOT;

exports.getAllOrders = async (req, res, next) => {
  try {
    const docs = await orderServices.getAllOrders();
    const response = {
      count: docs.length,
      orders: docs.map((doc) => {
        return {
          user: doc.name,
          products: doc.products,
          _id: doc._id,
          request: {
            type: "GET",
            url: root + "/orders/" + doc._id,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.addOrder= async (req, res, next) => {
  try {
    const {user, products} = req.body;
    console.log("here")
    const result = await orderServices.addOrder(user, products);
    console.log("here2")
    res.status(201).json({
      message: "Order Added",
      Order: {
        user: result.user,
        products: result.products,
        request: {
          type: "GET",
          url: root + "orders/" + result._id,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const id = req.params.orderID;
    const doc = await orderServices.getOrder(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const id = req.params.orderID;
    const payload = req.body;
    const order = await orderServices.addOrder(id);
    if (order) {
      const result = await orderServices.updateOrder(id, payload);
      res.status(200).json(result);
    } else {
      throw "Order doesn't exist";
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.orderID;
    const order = await orderServices.getOrder(id);
    if (order) {
      const result = await orderServices.deleteOrder(id);
      res.status(200).json({
        message: "Order deleted",
        result: result,
        request: {
          type: "POST",
          url: root + "/orders",
          body: { user: "String", products: "Array"},
        },
      });
    } else {
      throw "Order doesn't exist";
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};