import express from 'express'
import { protect } from '../middleware/protect.js'
import { appController } from '../controllers/app.controller.js'

export const router = express.Router()

// router.get('/furniture', appController.getFilteredFurniture.bind(appController));
router.get('/furniture/:id', appController.getSingleFurniture.bind(appController))

router.get('/favorites', protect, appController.getFavorites)
router.post('/favorites', protect, appController.writeFavoriteItem)
// router.delete('/favorites', protect, appController.deleteFavouriteItem);

// router.get('/orders', protect, appController.getOrders);
// router.post('/orders', protect, appController.processOrder);
// router.delete('/orders', protect, appController.deleteOrder);

router.get('/cart', protect, appController.getCartItems)
router.post('/cart', protect, appController.addCartItem)
router.delete('/cart', protect, appController.removeCartItem)
