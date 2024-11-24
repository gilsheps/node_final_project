const express = require("express");
const employeesService = require("../services/employeesService.js");

const router = express.Router();

// get all employees
router.get("/", async (req, res) => {
  const filters = req.body;
  const employees = await employeesService.getAllEmployees(filters);
  res.send(employees);
});

// create new employees
router.post("/", async (req, res) => {
  const obj = req.body;
  const result = await employeesService.addEmployee(obj);
  res.json(result)
});

module.exports = router;
