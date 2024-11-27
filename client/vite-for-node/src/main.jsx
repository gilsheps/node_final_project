// import { StrictMode } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router";
// import { createRoot } from "react-dom/client"

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);