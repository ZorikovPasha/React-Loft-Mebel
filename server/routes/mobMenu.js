const express = require('express');
const MobMenu = require('../models/mobMenuModel');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const mobMenu = await MobMenu.find();
    res.json(mobMenu);
  } catch (err) {
    res.json({ message: err })
  }
});

module.exports = router;