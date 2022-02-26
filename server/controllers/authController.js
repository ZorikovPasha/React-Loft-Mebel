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

      if (!errors) {
        ApiError.badRequest(res, 'An error occured');
        // return res.status(400).json({ message: 'An error occured', errors });
      }

      const { userName, email, password } = req.body;
      const candidate = await UserModel.findOne({userName});

      if (candidate) {
        ApiError.badRequest(res, 'User with provided id already exists');
        // return res.status(400).json({ message: 'User with provided id already exists' })
      }

      const hashedPassword = bcrypt.hashSync(password, 6);

      const userRole = await RoleModel.findOne({ value: 'USER' });
      const user = new UserModel({ 
        userName, 
        email, 
        password: hashedPassword, 
        roles: [userRole.value]
      });

      await user.save();
      res.json({ message: 'User has been registered' })
    } catch (e) {
      ApiError.badRequest(res, 'An error occured during registration');
      // res.status(400).json({ message: 'An error occured during registration' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = UserModel.findOne({ email });

      if (!user) {
        ApiError.badRequest(res, 'User with email ' + email + ' has not found');
        // return res.status(400).json({ message: 'User with email ' + email + ' has not found' });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        ApiError.badRequest(res, 'You provided incorrect password');
        // return res.status(400).json({ message: 'You provided incorrect password' });
      }

      const token = generateToken(user._id, email, password);
      return res.json(token);
    } catch (e) {
      ApiError.internal(res, 'An error occured during login');
      // res.status(400).json({ message: 'An error occured during login' });
    }
  }
}

module.exports = new authController;