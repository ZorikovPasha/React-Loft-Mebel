const express = require('express');
const Furniture = require('../models/FurnitureModel');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const furnitureItems = await Furniture.find();
    res.json(furnitureItems);
  } catch (err) {
    res.json({ message: err })
  }
});

module.exports = router;