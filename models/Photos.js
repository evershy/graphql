/**
 * Created by yunmo on 2018/6/8.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const photosSchema = new Schema({
  name: String,
  shotPlace: String,
  url: String,
  desc: String,
});

module.exports = mongoose.model('Photos', photosSchema);
