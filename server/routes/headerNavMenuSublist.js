const express = require('express');
const headerNavMenuSublist = require('../models/headerNavMenuSublistModel');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const NavMenuSublists = await headerNavMenuSublist.find();
    console.log('NavMenuSublists', NavMenuSublists);
    res.json(NavMenuSublists);
  } catch (err) {
    res.json({ message: err })
  }
});

module.exports = router;