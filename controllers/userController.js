const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendGrid = require("@sendgrid/mail");
const userService = require("../services/userServices");

const salt = process.env.SALT;
sendGrid.setApiKey(process.env.S_KEY)


exports.signup = async (req, res, next) => {
  
};

exports.login = async (req, res, next) => {
  
};

exports.changePassword = async (req, res, next) => {
  
};

exports.forgotPassword = async (req, res, next) => {
  
};
