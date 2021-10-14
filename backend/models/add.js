const mongoose = require('mongoose');

const addSchema = mongoose.Schema({
  rateDay: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  finishTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  child: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
    default: 0,
    required: true,
  },
  comments: {
    type: String,
    default: 'N/A',
  },
  totalAmount: {
    type: Number,
    default: 0,
    required: true,
  },
  status: {
    type: String,
    default: 'open',
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

exports.Add = mongoose.model('Add', addSchema);
// exports.addSchema = addSchema;
