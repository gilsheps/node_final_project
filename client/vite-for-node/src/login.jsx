import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (JSON.parse(localStorage.getItem("user"))) {
      const token = JSON.parse(localStorage.getItem("user")).token || "";
    }
    const instance = axios.create({
      baseURL: "http://localhost:3005/auth/login",
      method: "POST",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   "content-type": "application/json",
      // },
    });
    const res = await instance.request({
      data: {
        username: fullName || e.target.username.defaultValue,
        email: email || e.target.email.defaultValue,
      },
    });
    console.log('resssss', res)
    if (res.status === 200) {
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: fullName || e.target.username.defaultValue,
          email: email || e.target.email.defaultValue,
        })
      );
      navigate("/main_page");
    }
  };

  return (
    <div style={{ whiteSpace: "pre-line" }}>
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
