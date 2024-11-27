import api from "./api.js"

const BASE_URL = "http://localhost:3005/";

const getDepartmentsList = async () => {
  return await api.get(`${BASE_URL}department`);
};

const getEmployessByDepartmentList = async (depId) => {
  return await api.get(`${BASE_URL}department/${depId}/employees`);
};

const newDepartment = async (obj) => {
  return await api.post(`${BASE_URL}department`, obj);
};

const editDepartment = async (obj) => {
  return await api.put(`${BASE_URL}department`, obj);
};

export {
  getDepartmentsList,
  getEmployessByDepartmentList,
  newDepartment,
  editDepartment,
};
