import axios from "axios";

const BASE_URL = "http://localhost:3005/";

const getAllEmployee = async (obj) => {
  return await axios.get(`${BASE_URL}employees`);
};
const addNewEmployee = async (obj) => {
  return await axios.post(`${BASE_URL}employees`, obj);
};

const editEmployee = async (obj) => {
  return await axios.put(`${BASE_URL}employees`, obj);
};

const deleteEmployee = async (id) => {
  return await axios.delete(`${BASE_URL}employees/${id}`);
};

const getEmployeeById = async (id) => {
  return await axios.get(`${BASE_URL}employees/${id}`);
};

const getEmployeeName = async (id) => {
  const {data} = await getEmployeeById(id);
  return `${data.firstName} ${data.lastName}`;
};
export {
  getAllEmployee,
  addNewEmployee,
  editEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployeeName
};
