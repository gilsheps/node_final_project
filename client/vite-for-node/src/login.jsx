import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import api from "./utils/api.js";

export default function Login() {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken"); // Refresh token from storage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    // Call protected endpoint
    // api
    //   .get("/protected")
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((err) => {
    //     setError(err.response?.data?.error || "Something went wrong");
    //   });

    console.log("token", localStorage.getItem("authToken"));
  }, []);

  const setItem = async (key, value) => {
    return new Promise((resolve) => {
      localStorage.setItem(key, value);
      resolve(); // Resolve immediately since localStorage is synchronous
    });
  };


  const setItemAsyncWithDelay = (key, value, delay = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem(key, value);
            resolve();
        }, delay);
    });
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3005/auth/login", {
      username: fullName || e.target.username.defaultValue,
      email: email || e.target.email.defaultValue,
    });
    console.log(res, res.data);
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify({
        username: fullName || e.target.username.defaultValue,
        email: email || e.target.email.defaultValue,
        token : res.data.token
      }));
      navigate("/main_page");
    }
  };

  return (
    <div className="divCenter">
      <form onSubmit={handleSubmit}>
        Username:{" "}
        <input
          type="text"
          id="username"
          defaultValue="Leanne Graham"
          onChange={(e) => setFullName(e.target.value)}
        />{" "}
        <br />
        Email:{" "}
        <input
          type="text"
          id="email"
          defaultValue="Sincere@april.biz"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
