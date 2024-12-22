const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // Built-in Express JSON parser

// Log all incoming requests to check the HTTP method
app.use((req, res, next) => {
  console.log(`[DEBUG] Request received: ${req.method} ${req.originalUrl}`);
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

const users = [
  { username: "emilys", password: "yourpassword", email: "emilys@example.com", gender: "female" }
];

// POST route for login
app.post("/api/auth/login", (req, res) => {
  console.log("[DEBUG] POST /api/auth/login reached"); // Confirming request

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
