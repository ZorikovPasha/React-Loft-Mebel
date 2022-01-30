const mongoose = require('mongoose');

const headerNavMenuSublistSchema = mongoose.Schema({
  "01": [{ text: String, link: String }],
  "02": [{ text: String, link: String }],
  "03": [{ text: String, link: String }],
  "04": [{ text: String, link: String }],
  "05": [{ text: String, link: String }],
  "06": [{ text: String, link: String }],
  "07": [{ text: String, link: String }],
});

module.exports = mongoose.model('headerNavMenuSublist', headerNavMenuSublistSchema);