const express = require("express");
const departmentService = require("../services/departmentService.js");

const router = express.Router();


// get all department
router.get("/", async (req, res) => {
    const filters = req.body;
    const department = await departmentService.getAllDepartment(filters)
    res.send(department)
})

// create new department
router.post("/", async (req, res) => {
    const obj = req.body;
    const result = await departmentService.addDepartment(obj);
    res.json(result)
  });


// update department
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const obj = req.body;
      delete obj._id
      const result = await departmentService.updateDepartment(id, obj);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router;