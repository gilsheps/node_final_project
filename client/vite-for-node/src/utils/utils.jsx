import axios from "axios";

const BASE_URL = "http://localhost:3005/";

const getAllShifts = async () => {
  return await axios.get(`${BASE_URL}shifts`);
};

const sendUpdateShift = async(obj) => {
  return await axios.put(`${BASE_URL}shifts/${obj._id}`, obj);
};

export { getAllShifts, sendUpdateShift };
