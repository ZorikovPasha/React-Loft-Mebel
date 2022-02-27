const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

const UserModel = require('../models/userModel');
const RoleModel = require('../models/RoleModel');

const ApiError = require('../error/ApiError');

const generateToken = (id, email, roles) => {
  const payload = {
    id, 
    email,
    roles
  }

  return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
};

class authController {
  async register(req, res) {
    try {
      const errors = validationResult(req);

      if (errors.length) {
        return ApiError.badRequest(res, 'An error occured');
      }

      const { userName, email, password } = req.body;
      const candidate = await UserModel.findOne({userName});

      if (candidate) {
        return ApiError.badRequest(res, 'User with provided id already exists');
      }

      const hashedPassword = bcrypt.hashSync(password, 4);

      const userRole = await RoleModel.findOne({ value: 'USER' });
      const user = new UserModel({ 
        userName, 
        email, 
        password: hashedPassword, 
        roles: [userRole.value]
      });

      await user.save();
      res.json({ message: 'User has been registered', status: 200 })
    } catch (e) {
      return ApiError.badRequest(res, 'An error occured during registration');
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        return ApiError.badRequest(res, 'User with email ' + email + ' has not found');
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return ApiError.badRequest(res, 'You provided incorrect password');
      }

      const token = generateToken(user._id, email, password);

      return res.json({token: token});
    } catch (e) {
      return ApiError.internal(res, 'An error occured during login');
    }
  }
}

module.exports = new authController;