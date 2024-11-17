// THE PURPOSE OF THIS FILE IS TO STORE COMMON FUNCTIONS, WHICH WILL BE USED IN MULTIPLE FILES

const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

exports = {};

exports.getToken = async (email, user) => {
    const token = jwt.sign({identifier : user._id}, process.env.JWT_SECRET_KEY);
    return token;
};

module.exports = exports;