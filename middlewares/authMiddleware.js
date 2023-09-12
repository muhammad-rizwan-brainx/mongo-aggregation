const JWT = require("jsonwebtoken");
const SALT = process.env.SALT;

module.exports = (req, res, next)=>{
    try {
        const data = JWT.verify(req.headers.authorization.split(" ")[1], SALT);
        req.userData = data;
        next();
    }
    catch(error){
        res.status(500).json({
            Messsage: "Auth Error"
        });
    }
}