import api from "./api.js"

const BASE_URL = "http://localhost:3005/users";

const getAllUsers = async () => {
  return await api.get(`${BASE_URL}`);
};

export { getAllUsers,  };
