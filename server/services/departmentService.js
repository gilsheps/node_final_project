const departmentRepo = require("../repositories/departmentRepo.js");

const getAllDepartment = (filters) => {
  return departmentRepo.getAllDepartment(filters);
};


const getById = (id) => {
  return userRepo.getById(id);
};

const addEmployee = (obj) => {
  return employeesRepo.addEmployee(obj);
};



module.exports = {
  getAllDepartment,
  // getById,
  // addUser,
  // updateUser,
  // deleteUser,
  // getUsersFromJh,
  // isUserExists,
};
