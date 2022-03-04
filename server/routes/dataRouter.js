const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');

router.get('/furniture', dataController.getFilteredFurniture.bind(dataController));
router.post('/furniture', dataController.getSingleFurniture.bind(dataController));
router.get('/slides', dataController.getSlides.bind(dataController));
router.get('/mobMenu', dataController.getMonMenuData.bind(dataController));

module.exports = router;