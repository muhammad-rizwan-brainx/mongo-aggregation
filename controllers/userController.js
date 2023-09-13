const userServices = require("../services/userServices");
const validationServices = require("../services/validationServices");
const authServices = require("../services/authServices");
const sendEmail = require("../services/emailServices");

exports.signup = async (req, res, next) => {
  try {
    const validationErrors = validationServices.validateSignupCredentials(req);
    if (validationErrors.length > 0) {
      return res.status(422).json({ errors: validationErrors });
    }
    const userExists = await userServices.existingUserCheck(req.body.email);
    if (userExists) {
      return res.status(422).json({
        Message: "Mail Exists Already",
      });
    }
    await userServices.addUser(req.body);
    res.status(201).json({
      Message: "User Created",
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validationErrors = validationServices.validateLoginCredentials(req);
    if (validationErrors.length > 0) {
      return res.status(422).json({ errors: validationErrors });
    }
    const user = await userServices.fetchUser(email);
    if (!user) {
      return res.status(401).json({
        Message: "User Doesn't Exist",
      });
    }
    console.log(password, user.password)
    const result = await validationServices.validatePassword(password, user.password);
    if (result) {
      const token = authServices.createToken(email, user._id);
      authServices.addResetToken(email, token);
      return res.status(200).json({
        message: "successful",
        token: token,
      });
    }
    res.status(401).json({
      Message: "Auth Fail",
    });
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { email, resetPasswordToken, newPassword } = req.body;
    const auth = await authServices.getAuth(resetPasswordToken);
    if (!auth) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }
    const user = await userServices.fetchUser(email);
    await userServices.updateUserPassword(user,newPassword);
    await authServices.deleteResetToken(email);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to process change password request" });
  }
};

exports.forgotPassword = async (req, res, next) => {
    try {
      const validationErrors = validationServices.validateForgotPasswordCredentials(req);
  
      if (validationErrors.length > 0) {
        return res.status(422).json({ errors: validationErrors });
      }
      const { email } = req.body;
      const user = userServices.fetchUser(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const resetToken = authServices.createToken(email, user._id)
      console.log(resetToken)
      const expiration = Date.now() + 3600000;
      console.log("heree")
      authServices.addResetToken(email, resetToken, expiration);
      console.log("after saver")
      await sendEmail({resetToken, email})
      
      res.status(200).json({ message: "Password reset link sent successfully" , token : resetToken});
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to process forgot password request" });
    }
  };
