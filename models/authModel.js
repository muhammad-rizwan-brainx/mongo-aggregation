const mongoose = require("mongoose");


const authSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/
    },
    resetToken: {
        type: String
    },
    expirationTime: {
        type: String
    }
});

module.exports = mongoose.model("Auth", authSchema);
