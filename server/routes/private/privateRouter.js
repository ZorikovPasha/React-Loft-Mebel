const express = require('express');
const router = express.Router();
const protect = require('../../middleware/protect');
const dataController = require('../../controllers/dataController');

router.post('/favorite', protect, dataController.writeFavoriteItem);
// router.post('/', protect, () => {});

module.exports = router;