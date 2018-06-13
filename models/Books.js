const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
  name: String,
  author: String,
  published: Boolean,
});

module.exports = mongoose.model('Books', booksSchema);
