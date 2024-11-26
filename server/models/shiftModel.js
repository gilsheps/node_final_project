const mongoose = require("mongoose");

const shiftsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startingHour: { type: Number, required: true },
  endingHour: { type: Number, required: true },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});
const Shift = mongoose.model("Shift", shiftsSchema);
module.exports = Shift;
