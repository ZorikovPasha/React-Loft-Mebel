const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  id: Number,
  colors: [String],
  quintity: Number,
  dimensions: {
    width: Number,
    length: Number,
    height: Number,
  },
  price: Number,
});

const UserSchema = mongoose.Schema({
  name: String,
  surname: String,
  userName: {
    type: String,
    unigue: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unigue: true,
    required: true
  },
  phone: String,
  city: String,
  street: String,
  house: String,
  apartment: String,
  roles: [{ type: String, ref: 'Role' }],
  favorites: [String],
  cartItems: [CartItemSchema]
})


mongoose.models = {}
module.exports = mongoose.model('User', UserSchema);
