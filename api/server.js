const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // Updated to the built-in Express JSON parser

const users = [
  { username: "emilys", password: "yourpassword", email: "emilys@example.com", gender: "female" }
];

app.post("/auth/login", (req, res) => {
  const { username, password, email } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    const expiresInMins = 30;
    const token = "your-jwt-token"; 

    return res.status(200).json({
      user: {
        username: user.username,
        email: email || user.email,
        gender: user.gender,
        expiresInMins,
        token,
      },
    });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = app;
