const express = require('express');
const { type } = require('express/lib/response');
const Furniture = require('../models/FurnitureModel');


const router = express.Router();

router.get('/', async (req, res) => {

  const mappedValues = {
    room: 'room',
    material: 'material',
    type: 'type.value',
    brand: 'brand'
  };

  console.log(req.query);

  const findCriteria = Object.keys(req.query).reduce((accum, key) => {
    if (key === 'color' || key === 'sort') return accum;
      return {...accum, [mappedValues[key]]: req.query[key]};
  }, {});

  let furnitureItems;

  try {
    switch (req.query.sort) {
      case 'asc':
        furnitureItems = await Furniture.find(findCriteria).sort({ priceNew: 1 }).collation({locale: "en_US", numericOrdering: true});
        break; 
      case 'desc':
        furnitureItems = await Furniture.find(findCriteria).sort({ priceNew: -1 }).collation({locale: "en_US", numericOrdering: true});
        break; 
      case 'pop':
        furnitureItems = await Furniture.find(findCriteria).sort({ rating: -1 });
        break; 
      default:
        furnitureItems = await Furniture.find(findCriteria);
        break;
      }

    res.json(furnitureItems);
  } catch (err) {
    res.json({ message: err })
  }
});

module.exports = router;