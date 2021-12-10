const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const coffeeCategorySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const CoffeeCategory = mongoose.model('coffeeCategory', coffeeCategorySchema);

module.exports = CoffeeCategory;