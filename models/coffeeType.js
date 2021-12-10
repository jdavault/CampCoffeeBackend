const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coffeeTypeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const CoffeeType = mongoose.model('coffeeType', coffeeTypeSchema);

module.exports = CoffeeType;