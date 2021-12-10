const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const learnMoreDataSchema = new Schema({
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

const LearnMoreData = mongoose.model('learnMoreData', learnMoreDataSchema);

module.exports = LearnMoreData;