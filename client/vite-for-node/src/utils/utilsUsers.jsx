import api from "../utils/api.js";

const getAllUsers = async () => {
  return await api.get("/users");
};

const getUserId = async (userName) => {
  return await api.get(`/users/fullName/${userName}`);
};

export { getAllUsers, getUserId };