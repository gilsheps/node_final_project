const express = require("express");
const userService = require("../services/userService");

const router = express.Router();

// get all employees
router.get("/", async (req, res) => {
  const filters = req.body;
  const users = await userService.getAllUsers(filters);
  res.send(users);
});

// get user by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const employee = await userService.getById(id);
  res.json(employee);
});

// create new user
router.post("/", async (req, res) => {
  const obj = req.body;
  console.log("post", obj);
  const result = await userService.addUser(obj);
  res.json(result);
});

module.exports = router;
