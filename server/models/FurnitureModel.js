const mongoose = require('mongoose');

const furnitureSchema = mongoose.Schema({
    imageUrl: String,
    bigImageUrl: String,
    thumbsUrls: [String],
    name: String,
    type: String,
    priceOld: String,
    priceNew: String,
    dimensions: {
      width: Number,
      length: Number,
      height: Number
    },
    colors: [String],
    rating: Number,
    sale: String
});

module.exports = mongoose.model('furniture', furnitureSchema);