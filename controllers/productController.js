const productServices = require("../services/productServices");

exports.addProduct = async (req, res, next) => {
    const {name, unitPrice, availableQuantity} = req.body;

}

exports.getProduct = async (req, res, next)=>{
    const id = req.paraams.productID;

}

exports.getAllProducts = async (req, res, next)=>{
    
}

exports.updateProduct = async(req, res, next) =>{
    const id = req.paraams.productID;
}

exports.deleteProduct = async (req, res, next)=>{
    const id = req.paraams.productID;
}