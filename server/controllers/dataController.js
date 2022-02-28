const MobMenu = require('../models/mobMenuModel');
const Furniture = require('../models/FurnitureModel');
const Slides = require('../models/SliderModel');
// const User = require('../models/UserModel');

const ApiError = require('../error/ApiError');

class dataController {
  constructor(values) {
    this.mappedValues = values;
  }

  async getFilteredFurniture(req, res) {
    try {
      const findCriteria = Object.keys(req.query).reduce((accum, key) => {
        if (key === 'color' || key === 'sort') return accum;
          return {...accum, [this.mappedValues[key]]: req.query[key]};
      }, {});
    
      let furnitureItems;
    
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
    } catch (e) {
      return ApiError.internal(res, e);
    }
  }

  async getMonMenuData(req, res) {
    try {
      const mobMenu = await MobMenu.find();
      res.json(mobMenu);
    } catch (err) {
      return ApiError.internal(res, err);
    }
  }

  async getSlides(req, res) {
    try {
      const SlidesItems = await Slides.find();
      res.json(SlidesItems);
    } catch (err) {
      return ApiError.internal(res, err);
    }
  }

  async writeFavoriteItem(req, res) {
    const { id } = req.body;

    if (!id) {
      return ApiError.badRequest(res, 'No id provided');
    }

    // await User.updateOne({ id: user.id }, { $push: { favorites: id} });
  }
}

module.exports = new dataController({
  room: 'room',
  material: 'material',
  type: 'type.value',
  brand: 'brand'
});