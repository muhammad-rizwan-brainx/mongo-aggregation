const bcrypt = require("bcrypt");
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateSignupCredentials = (req) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Username is required");
  }

  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else if (!isValidEmail(email)) {
    errors.push("Email is invalid");
  }

  if (!password || password.trim() === "") {
    errors.push("Password is required");
  } else if (password.length < 6) {
    errors.push("Password should be at least 6 characters long");
  }

  return errors;
};

const validateLoginCredentials = (req) => {
    const { email, password } = req.body;
    const errors = [];
  
    if (!email || email.trim() === "") {
      errors.push("Email is required");
    } else if (!isValidEmail(email)) {
      errors.push("Email is invalid");
    }
  
    if (!password || password.trim() === "") {
      errors.push("Password is required");
    }
  
    return errors;
  };

  const validateForgotPasswordCredentials = (req) => {
    const { email } = req.body;
    const errors = [];
  
    if (!email || email.trim() === "") {
      errors.push("Email is required");
    } else if (!isValidEmail(email)) {
      errors.push("Email is invalid");
    }
  
    return errors;
  };

  const validatePassword = async(password1, password2)=>{
    console.log("Here")
    return await bcrypt.compare(password1, password2);
  }

  const validateProductAttributes = (req) => {
    if (!req.body.name || !req.body.unitPrice || !req.body.availableQuantity) {
      return false;
    }
    return true;
  };

module.exports = {
    validateForgotPasswordCredentials,
    validateSignupCredentials,
    validateLoginCredentials,
    validatePassword,
    validateProductAttributes
};
