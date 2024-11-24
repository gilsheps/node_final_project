const express = require("express");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService.js");

const router = express.Router();
const SECRET_KEY = "some_key";
const USER_ID = "some_id";
const REFRESH_SECRET_KEY = "your-refresh-secret-key";

// Middleware to validate JWT
// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (authHeader) {
//     const token = authHeader.split(" ")[1]; // Extract the token

//     jwt.verify(token, SECRET_KEY, (err, user) => {
//       if (err) {
//         // Check if the error is due to an expired token

//         console.log("errrr", err, err.name);
//         if (err.name === "TokenExpiredError") {
//           try {
//             // Decode the expired token
//             const expiredPayload = jwt.decode(token);
//             console.log('expiredPayload',expiredPayload)

//             // Optionally validate the expired token (e.g., using a refresh token)
//             if (!expiredPayload) {
//               return res.status(403).send("Invalid token payload");
//             }
//             console.log('after if')

//             // Issue a new token
//             const newToken = jwt.sign(
//               { id: USER_ID },
//               SECRET_KEY,
//               { expiresIn: "1h" }
//             );
//             console.log('newToken', newToken)

//             // Send the new token in the response
//             res.setHeader("Authorization", `Bearer ${newToken}`);
//             req.user = expiredPayload; // Attach the user to the request for downstream use
//             next();
//           } catch (error) {
//             return res.status(401).send("Token refresh failed");
//           }
//         } else {
//           return res.status(403).send("Invalid token");
//         }
//       } else {
//         req.user = user; // Attach the user to the request for downstream use
//         next();
//       }
//     });
//   } else {
//     res.status(401).send("Authorization header missing");
//   }
// };

// router.get("/", async (req, res) => {
//   res.status(404).send("what???");
// });

// router.post('/refresh', (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(401).send('Refresh token missing');
//   }

//   jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(403).send('Invalid refresh token');
//     }

//     const newToken = jwt.sign({ name: user.name }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token: newToken });
//   });
// });
// router.post("/login", authenticateJWT, async (req, res) => {
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, email } = req.body;
  const { authorization } = req.headers;
  console.log();
  const isUserExists = await userService.isUserExists(username, email);
  console.log("isUserExists", isUserExists);
  if (isUserExists.length > 0) {
    const accessToken = jwt.sign({ id: USER_ID }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ accessToken });
  } else {
    res.status(500).send("Invalid credentials");
  }
});

module.exports = router;
