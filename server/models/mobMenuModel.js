const mongoose = require('mongoose');

const mobMenuSchema = mongoose.Schema({
  top: [{ imgLink: String, mobMenuItem: String, link: String }],
  body: [{ imgLink: String, mobMenuItem: String, link: String }],
});

module.exports = mongoose.model('mobMenu', mobMenuSchema);