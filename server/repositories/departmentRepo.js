const Department = require("../models/departmentModel.js");


const getAllDepartment = (filters) => {
    console.log("getAllEmployees", filters);
    return Department.find(filters);
  };

  const addDepartment = (obj) => {
    return new Department(obj).save()
  }

  module.exports = {
    getAllDepartment,
    addDepartment
  }