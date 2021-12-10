const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const partnerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true
});

const PartnerAccess = mongoose.model('partner', partnerSchema);

module.exports = PartnerAccess;