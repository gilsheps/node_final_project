const Employees = require("../models/employeeModel.js");

const getAllEmployees = (filters) => {
  console.log("getAllEmployees", filters);
  return Employees.find(filters);
};

const addEmployee = (obj) => {
  return new Employees(obj).save();
};

const updateEmployee = (id, obj) => {
  console.log("updateShift", id, obj);
  return Employees.findByIdAndUpdate(id, obj);
};

// Delete
const deleteEmployee = (id) => {
  return Employees.findByIdAndDelete(id);
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
