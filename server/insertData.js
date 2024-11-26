const express = require("express");
const router = express.Router();

// Create Models
const User = require("./models/userModel");
const Department = require("./models/departmentModel");
const Employee = require("./models/employeeModel");
const Shift = require("./models/shiftModel");

// Insert Sample Data
router.get("/", async (req, res) => {
  try {
    // Clear previous data
    await User.deleteMany({});
    await Department.deleteMany({});
    await Employee.deleteMany({});
    await Shift.deleteMany({});

    // Create a User
    const user = new User({ fullName: "Leanne Graham", numOfActions: 10 });
    await user.save();

    // Create a Department with the user as the manager
    const department = new Department({
      name: "HR Department",
      manager: user._id,
    });
    await department.save();

    // Create Employees and assign to the department
    const employee1 = new Employee({
      firstName: "John",
      lastName: "Smith",
      startWorkYear: 2020,
      departmentId: department._id,
    });
    const employee2 = new Employee({
      firstName: "Alice",
      lastName: "Johnson",
      startWorkYear: 2021,
      departmentId: department._id,
    });
    await Employee.insertMany([employee1, employee2]);

    // Create Shifts
    const shift1 = new Shift({
      date: new Date("2024-11-25"),
      startingHour: 9,
      endingHour: 17,
    });
    const shift2 = new Shift({
      date: new Date("2024-11-26"),
      startingHour: 10,
      endingHour: 18,
    });
    await Shift.insertMany([shift1, shift2]);

    console.log("Sample data inserted successfully.");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    // mongoose.connection.close();
  }
  res.send('mshahsvjhsdf')
});

// Run the data insertion function
module.exports = router;
