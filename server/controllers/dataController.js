const MobMenu = require('../models/mobMenuModel');
const Furniture = require('../models/FurnitureModel');
const Slides = require('../models/SliderModel');
const User = require('../models/UserModel');

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
          furnitureItems = await Furniture.find(findCriteria).sort({ priceNew: 1 });
          break; 
        case 'desc':
          furnitureItems = await Furniture.find(findCriteria).sort({ priceNew: -1 });
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
    try {
      const { id } = req.body;
      if (!id) {
        return ApiError.badRequest(res, 'No id provided');
      }
  
      await User.updateOne({ id: req.user.id }, { $push: { favorites: id} });
      res.status(200).json({ message: "Item added to favorites successfully" })
  
    } catch (err) {
      return ApiError.internal(res, err);
    }
  }

  async getFavorites(req, res) {
    try {
      const { favorites } = req.user;
      res.json({ favorites });
    } catch (err) {
      return ApiError.internal(res, err);
    }
  }

  async addCartItem (req, res) {
    try {
      const { id, colors, quintity, dimensions, price } = req.body;

      if (!id || !colors || !quintity || !dimensions || !price) {
        return ApiError.badRequest(res, 'Provided incomplete data');
      }

      await User.updateOne({ id: req.user.id }, { $push: { cartItems: {
        id,
        colors,
        quintity,
        dimensions,
        price,
      }}});

      res.status(200).json({ message: "Item successfully added to cart" })
    } catch (err) {
      return ApiError.internal(res, err);
    }
  }

  async getCartItems(req, res) {
    try {
      if (req.user) {

        const { cartItems } = await User.findOne({ id: req.user._id })
        delete cartItems._id
        res.json({ items: cartItems })
      }
    } catch (err) {
      return ApiError.internal(res, err);
    }
  }
}

module.exports = new dataController({
  room: 'room',
  material: 'material',
  type: 'type.value',
  brand: 'brand'
});