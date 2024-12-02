import api from "../utils/api.js";

const BASE_URL = "http://localhost:3005/";

const getAllShifts = async () => {
  return await api.get(`${BASE_URL}shifts`);
};

const sendUpdateShift = async(obj) => {
  return await api.put(`${BASE_URL}shifts/${obj._id}`, obj);
};

export { getAllShifts, sendUpdateShift };
