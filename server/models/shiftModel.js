const mongoose = require('mongoose');

const shiftsSchema = new mongoose.Schema(
  {
    date: Date,
    starting_hour: Number,
    ending_hour: Number
  },
  { versionKey: false }
);
const Shift = mongoose.model('shift', shiftsSchema);
module.exports = Shift;