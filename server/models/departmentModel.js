const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
});

const Department = mongoose.model("department", departmentSchema);
module.exports = Department;
