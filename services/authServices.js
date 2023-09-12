const Auth = require("../models/authModel");
const JWT = require("jsonwebtoken");
const salt = process.env.SALT;
const addResetToken = async(email, resetToken, expiration)=>{
    const existingAuth = await Auth.findOne({email}).exec();
    if(!existingAuth){
        const auth = new Auth({
            email,
            resetToken,
            expiration
        });
        console.log(" in saver")
        return await auth.save();
    } else{
        const payload ={
            email,
            resetToken,
            expiration
        }
        return await Auth.updateOne({ email: email }, { $set: payload }).exec();
    }
    
}
const deleteResetToken = async(email)=>{
    return await Auth.deleteOne({email}).exec();
}
const getAuth = async(resetToken)=>{
    return await Auth.findOne({resetToken}).exec()
}

const createToken = (email, id)=>{
    return JWT.sign(
        {
          email,
          id
        },
        salt,
        {
          expiresIn: "1h",
        }
      );
}

module.exports ={
    addResetToken,
    deleteResetToken,
    createToken,
    getAuth
}