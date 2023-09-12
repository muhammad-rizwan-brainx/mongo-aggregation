const userModel = require("../models/userModel");

const existingUserCheck = async (email)=>{
    return await userModel.findOne({email});
}

const addUser = async (userData)=>{
    const {name, email, password} = userData;
    const user = new userModel({
        name,
        email,
        password
    });
    return await user.save();
}

const updateUserPassword = async (user, newPassword) => {
    user.password = newPassword;
    return await user.save();
  };

const fetchUser = async(email)=>{
    return await userModel.findOne({email}).exec();
}
module.exports = {
    existingUserCheck,
    addUser,
    fetchUser,
    updateUserPassword
}