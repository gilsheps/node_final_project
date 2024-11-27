const Employees = require("../models/employeeModel.js");
const Department = require("../models/departmentModel.js");

const getAllEmployees = (filters) => {
  console.log("getAllEmployees", filters);
  return Employees.find(filters);
};

const addEmployee = async (obj) => {
  console.log("addEmployee", obj);
  const department = await Department.findById(obj.departmentId);
  if (department) {
    console.log("User found:", department);
  } else {
    console.log("User not found.");
  }
  // Department
  return new Employees(obj).save();
};

const getById = (id) => {
  return Employees.findById(id);
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
  getById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
