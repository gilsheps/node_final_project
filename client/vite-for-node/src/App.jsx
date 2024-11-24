import { useState } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import UserComp from "./userComp";

function App() {
 

  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/main_page" element={<UserComp />}/>
    </Routes>
  )
   
}

export default App;
