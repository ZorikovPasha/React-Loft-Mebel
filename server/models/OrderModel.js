const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  id: Number,
  name: String,
  imageUrl: String,
  price: Number,
  date: Date,
  status: String,
  dimensions: {
    width: Number,
    length: Number,
    height: Number
  },
  colors: [String],
  quintity: Number
});

module.exports = mongoose.model('orders', orderSchema);