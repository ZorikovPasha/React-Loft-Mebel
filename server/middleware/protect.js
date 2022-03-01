const jwt = require('jsonwebtoken');

const ApiError = require("../error/ApiError");
const User = require('../models/UserModel');


const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return ApiError.notAuthorized(res, "Not authorized because of no token provided");
  }

  try {
    const uncodedPayload = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(uncodedPayload.id);
    if (!user) {
      return ApiError.notAuthorized(res, 'No user found with this id');
    }

    req.user = user;
    next()
  } catch (e) {
    return ApiError.internal(res, 'An error occured');
  }
}

module.exports = protect;