const Shift = require("../models/shiftModel.js");
// Get All
const getAllShifts = async (filters) => {
  console.log("find", filters);
  return Shift.find(filters);
};

const addShift = (obj) => {
  return new Shift(obj).save();
};

const getById = (id) => {
  return Shift.findById(id);
};

const updateShift = (id, obj) => {
  console.log("updateShift", id, obj);
  return Shift.findByIdAndUpdate(id, obj);
};

module.exports = {
  getAllShifts,
  addShift,
  getById,
  updateShift,
};
