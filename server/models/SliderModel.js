const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  imageUrl: String,
});

module.exports = mongoose.model('slides', sliderSchema);