import axios from "axios";

const getItem = async () => {
  return new Promise((resolve) => {
    localStorage.getItem('user');
    resolve(); // Resolve immediately since localStorage is synchronous
  });
};

// Get token from localStorage (or other storage)
const storage = {...localStorage};
console.log("api", JSON.parse(storage.user).token);
const token = JSON.parse(storage.user).token
// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:3005/", // Replace with your API's base URL
  headers: {
    Authorization: token ? `Bearer ${token}` : "", // Add token if available
  },
});

export default api;
