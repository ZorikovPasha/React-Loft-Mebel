const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
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
  roles: [{ type: String, ref: 'Role' }],
  favorites: [String]
})

module.exports = model('User', UserSchema);