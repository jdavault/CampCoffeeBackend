const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const discoverCoffeeDataSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imageBig: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  liked: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  shelfLife: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const DiscoverCoffeeData = mongoose.model('discoverCoffeeData', discoverCoffeeDataSchema);

module.exports = DiscoverCoffeeData;