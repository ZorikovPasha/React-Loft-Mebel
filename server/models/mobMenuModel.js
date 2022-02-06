const mongoose = require('mongoose');

const mobMenuSchema = mongoose.Schema({
  top: [{ imgLink: String }],
  body: [{ imgLink: String }]
});

module.exports = mongoose.model('mobMenu', mobMenuSchema);