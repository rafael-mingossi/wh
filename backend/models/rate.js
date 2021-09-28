const mongoose = require('mongoose');

const rateSchema = mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

exports.Rate = mongoose.model('Rate', rateSchema);
// exports.rateSchema = rateSchema;
