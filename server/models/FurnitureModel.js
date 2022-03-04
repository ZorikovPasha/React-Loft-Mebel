const mongoose = require('mongoose');

const furnitureSchema = mongoose.Schema({
    id: Number,
    imageUrl: String,
    bigImageUrl: String,
    thumbsUrls: [String],
    name: String,
    type: {
      label: String,
      value: String
    },
    priceOld: Number,
    priceNew: Number,
    dimensions: {
      width: Number,
      length: Number,
      height: Number
    },
    colors: [String],
    rating: Number,
    sale: String,
    room: String,
    material: String,
    brand: String
});

module.exports = mongoose.model('furniture', furnitureSchema);