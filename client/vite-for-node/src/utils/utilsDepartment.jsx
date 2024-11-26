import axios from "axios";
import { getEmployeeName } from "./utilsEmployee";

const BASE_URL = "http://localhost:3005/";

const getDepartmentsList = async () => {
  return await axios.get(`${BASE_URL}department`);
};

const getFullDepartmentsList = async (setDepartmentsList) => {
  const { data } = await getDepartmentsList();
  let arr = []
  data.map(async (dep) => {
    let managerName = await getEmployeeName(dep.manager);
    setDepartmentsList({ ...dep, managerName: managerName })
    // arr.push({ ...dep, managerName: managerName })
  });
  // console.log("res",arr);
  // return arr
};

const newDepartment = async (obj) => {
  return await axios.post(`${BASE_URL}department`, obj);
};

export { getDepartmentsList, getFullDepartmentsList };
