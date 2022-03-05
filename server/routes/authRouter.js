const express = require('express');
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const router = express.Router();

router.post('/register', [ 
    check('userName', 'User name provided is empty').notEmpty(), 
    check('email', 'Email is incorrect').normalizeEmail().isEmail(),
    check('password', 'Password should have at least 8 characters').isLength({ min: 8, max: 16 }), 
  ],
  authController.register);
router.post('/login', authController.login);

module.exports = router;