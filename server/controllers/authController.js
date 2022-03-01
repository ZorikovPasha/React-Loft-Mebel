const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');
const RoleModel = require('../models/RoleModel');
const ApiError = require('../error/ApiError');

const generateToken = (id, email, password) => {
  const payload = {
    id, 
    email,
    password
  }

  return jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.JWY_EXPIRATION });
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
      const hashedPassword = bcrypt.hashSync(password, 10);

      const userRole = await RoleModel.findOne({ value: 'USER' });
      const user = new UserModel({ 
        name: '',
        surname: '',
        userName, 
        email, 
        password: hashedPassword, 
        roles: [userRole.value],
        favorites: [],
        phone: '',
        city: '',
        street: '',
        house: '',
        apartment: '',
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

  async confirmAuth(req, res) {
    if (req.user) {
      res.status(200).json({ message: "Token is valid" })
    }
  }

  async writeUserData(req, res) {
    try {
      const {
        name,
        email,
        surname,
        phone,
        city,
        street,
        house,
        apartment } = req.body;
      console.log(name, email);
  
      await UserModel.updateOne({ id: req.user.id }, { $set: { 
        name,
        email,
        surname,
        phone,
        city,
        street,
        house,
        apartment 
      }});
      res.status(200).json({ message: "Data successfully was written" })
    } catch (err) {
      return ApiError.internal(res, 'An error occured during update user data');
    }
  }

  async getUserData(req, res) {
    try {
      const { name, email, surname, phone, city, street, house, apartment } = req.user;
      res.json({ name, email, surname, phone, city, street, house, apartment })
    } catch (err) {
      return ApiError.internal(res, 'An error occured during searching user data');
    }
  }
}

module.exports = new authController;