const productServices = require("../services/productServices");
const validationServices = require("../services/validationServices");
const root = process.env.ROOT;

exports.getAllProducts = async (req, res, next) => {
  try {
    const docs = await productServices.getAllProducts();
    const response = {
      count: docs.length,
      products: docs.map((doc) => {
        return {
          name: doc.name,
          unitPrice: doc.unitPrice,
          availableQuantity: doc.availableQuantity,
          _id: doc._id,
          request: {
            type: "GET",
            url: root + "/products/" + doc._id,
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

exports.addProduct = async (req, res, next) => {
  try {
    const { name, unitPrice, availableQuantity } = req.body;
    console.log(name)
    console.log(unitPrice)
    console.log(availableQuantity)
    if (!validationServices.validateProductAttributes(req)) {
      throw "Invalid product fields.";
    }
    const result = await productServices.addProduct(name, unitPrice, availableQuantity);

    res.status(201).json({
      message: "Product Added",
      Product: {
        name: result.name,
        unitPrice: result.unitPrice,
        availableQuantity: result.availableQuantity,
        id: result._id,
        request: {
          type: "GET",
          url: root + "products/" + result._id,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.productID;
    const doc = await productServices.getProduct(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.productID;
    const payload = req.body;
    if (payload.name || payload.unitPrice || payload.availableQuantity) {
      if (!validationServices.validateProductAttributes(payload.name, payload.unitPrice || payload.availableQuantity)) {
        throw "Invalid product fields.";
      }
    }
    const product = await productServices.getProduct(id);
    if (product) {
      const result = await productServices.updateProduct(id, payload);
      res.status(200).json(result);
    } else {
      throw "Product doesn't exist";
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.productID;
    const product = await productServices.getProduct(id);
    if (product) {
      const result = await productServices.deleteProduct(id);
      res.status(200).json({
        message: "Product deleted",
        result: result,
        request: {
          type: "POST",
          url: root + "/products",
          body: { name: "String", unitPrice: "Number" , availableQuantity: "Number"},
        },
      });
    } else {
      throw "Product doesn't exist";
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};