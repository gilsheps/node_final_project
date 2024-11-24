const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    first_name: { type: String, unique: true },
    last_name: { type: String, unique: true },
    start_work_year: Number,
    department_id: { type: mongoose.Schema.Types.ObjectId, ref: "department" },
  },
  { versionKey: false }
);

const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;
