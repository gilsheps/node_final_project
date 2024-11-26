import { useState } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import UserComp from "./userComp";
import NewEmployeeComp from "./system/employees/newEmployeeComp";
import EditDepartmentComp from "./system/department/editDepartmentComp"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main_page" element={<UserComp />} />
      <Route path="/add_employee" element={<NewEmployeeComp />} />
      <Route path="/edit_department" element={<EditDepartmentComp />} />
    </Routes>
  );
}

export default App;
