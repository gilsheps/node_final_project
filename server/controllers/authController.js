const express = require("express");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService.js");

const router = express.Router();
const SECRET_KEY = "some_key";
const USER_ID = "some_id";
const TOKEN_EXPIRATION = "1m";

function generateToken(username) {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
}

router.post("/login", async (req, res, next) => {
  const { username, email } = req.body;
  console.log("login", username, email);

  if (!username || !email) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const isUserExists = await userService.isUserExists(username, email);
  console.log("isUserExists", isUserExists);
  if (isUserExists.length == 0) {
    return res.status(403).json({ error: "Invalid credentials" });
  }
  const token = generateToken(username);
  res.json({ token });
});

router.get("/protected", (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

module.exports = router;
