const express = require('express');
const Slides = require('../models/SliderModel');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const SlidesItems = await Slides.find();
    res.json(SlidesItems);
  } catch (err) {
    res.json({ message: err })
  }
});

module.exports = router;