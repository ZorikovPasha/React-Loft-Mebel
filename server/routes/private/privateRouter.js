const express = require('express');
const router = express.Router();
const protect = require('../../middleware/protect');
const dataController = require('../../controllers/dataController');
const authController = require('../../controllers/authController');

router.post('/favorite', protect, dataController.writeFavoriteItem);
router.get('/favorites', protect, dataController.getFavorites);

router.post('/cartItem', protect, dataController.addCartItem);
router.get('/cartItems', protect, dataController.getCartItems);
router.post('/removeCartItem', protect, dataController.removeCartItem);

router.get('/check', protect, authController.confirmAuth);
router.post('/user', protect, authController.writeUserData);
router.get('/user', protect, authController.getUserData);

module.exports = router;