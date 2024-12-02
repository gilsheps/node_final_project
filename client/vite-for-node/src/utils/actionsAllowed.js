import api from "./api.js";
import {
  getUserNameFromLocalStorage,
  getUserFromLocalStorage,
  setInLocalStorage,
} from "./utilsLocalStorage.js";
import { getUserId } from "./utilsUsers.jsx";

const getActionsAllowed = async () => {
  const userFromLocalStorage = getUserFromLocalStorage();
  const userName = getUserNameFromLocalStorage();
  const { data } = await getUserId(userName);
  const userId = data._id;
  const updatedObject = { ...userFromLocalStorage, id: userId };
  setInLocalStorage("user", JSON.stringify(updatedObject));
  try {
    const { data: action } = await api.get(`/allowActions?id=${userId}`);
    console.log("getAcion", action);
  } catch (error) {
    console.error("erororo", error);
  }
};

const getActionsAllowedByUser = async (userId) => {
  return await api.get(`/allowActions/${userId}`);
};

export { getActionsAllowed, getActionsAllowedByUser };
