import axios from "axios";

const BASE_URL = "http://localhost:3005/auth/";

const checkProtected = async () => {
//   return await axios.get(`${BASE_URL}protected`).catch((err) => {
//     setError(err.response?.data?.error || "Something went wrong");
//   });


  try {
    const response = await axios.get(`${BASE_URL}protected`);
    return response.data; // Return the data if successful
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      // Generic error
      console.error("Unexpected error:", error);
    }
    return { error: error.response?.data || "An error occurred" }; // Return a custom error object
  }
};

export { checkProtected };
