const mongoose = require("mongoose");
const uri = process.env.MONGODB;
module.exports = mongoose.connect(uri);