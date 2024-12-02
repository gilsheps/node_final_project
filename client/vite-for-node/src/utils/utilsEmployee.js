import api from "./api.js"

const BASE_URL = "http://localhost:3005/";

const getAllEmployee = async (obj) => {
  return api.get('/employees');
};
const addNewEmployee = async (obj) => {
  return await api.post(`${BASE_URL}employees`, obj);
};

const editEmployee = async (obj) => {
  return await api.put(`${BASE_URL}employees`, obj);
};

const deleteEmployee = async (id) => {
  return await api.delete(`${BASE_URL}employees/${id}`);
};

const getEmployeeById = async (id) => {
  return await api.get(`${BASE_URL}employees/${id}`);
};

const getEmployeeName = async (id) => {
  const { data } = await getEmployeeById(id);
  return `${data.firstName} ${data.lastName}`;
};
export {
  getAllEmployee,
  addNewEmployee,
  editEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployeeName,
};
