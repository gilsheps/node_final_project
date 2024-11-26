const Department = require("../models/departmentModel.js");


const getAllDepartment = (filters) => {
    return Department.find(filters);
  };

  const addDepartment = (obj) => {
    return new Department(obj).save()
  }

  const updateDepartment = (id, obj) => {
    return Department.findByIdAndUpdate(id, obj);
  };

  module.exports = {
    getAllDepartment,
    addDepartment,
    updateDepartment
  }