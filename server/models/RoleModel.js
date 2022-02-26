const { Schema, model } = require('mongoose');


const RoleSchema = new Schema({
  value: {
    type: String,
    default: 'USER'
  },
})

module.exports = model('Role', RoleSchema);