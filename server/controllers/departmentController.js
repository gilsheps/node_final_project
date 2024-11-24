const express = require("express");
const departmentService = require("../services/departmentService.js");

const router = express.Router();


// get all department
router.get("/", async (req, res) => {
    const filters = req.body;
    const result = departmentService.getAllDepartment(filters)
    res.json(result)
})


module.exports = router;