const User = require("../models/userModel.js");
const axios = require("axios");

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
// Get All
const getAllUsers = (filters) => {
  console.log("getAllUsers", filters);
  return User.find(filters);
};

const getUsersFromJh = async () => {
  return await axios.get(USERS_URL);
};

// Get By ID
const getById = (id) => {
  return User.findById(id);
};

// Create
const addUser = async (obj) => {
  console.log("addUser", obj);
  const per = new User(obj);
  return await per.save();
};

// Update
const updateUser = (id, obj) => {
  return User.findByIdAndUpdate(id, obj);
};

// Delete
const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getById,
  addUser,
  updateUser,
  deleteUser,
  getUsersFromJh,
};
