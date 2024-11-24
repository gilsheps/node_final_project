const express = require("express");
const cors = require("cors");
const connectDB = require("./server/configs/db.js");
const shiftsController = require("./server/controllers/shiftsController.js");
const authController = require("./server/controllers/authController.js");
const employeesController = require("./server/controllers/employeesController.js");
const departmentController = require("./server/controllers/departmentController.js");

const app = express();
const PORT = 3005;

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3005", "http://localhost:5173"], // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // If you need to allow cookies
  })
);

app.use("/", express.json());
app.use("/auth", authController);
app.use("/shifts", shiftsController);
app.use("/employees", employeesController);
app.use("/department", departmentController);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
