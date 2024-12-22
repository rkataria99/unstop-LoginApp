const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"; // Use environment variable in production

app.use(cors());
app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[DEBUG] Request received: ${req.method} ${req.originalUrl}`);
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Mock user database
const users = [
  { username: "emilys", password: "yourpassword", email: "emilys@example.com", gender: "female" }
];

// Login route
app.post("/api/auth/login", (req, res) => {
  console.log("[DEBUG] POST /api/auth/login reached");

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, email: user.email }, // Payload
      SECRET_KEY, // Secret key
      { expiresIn: "30m" } // Token expiration
    );

    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        gender: user.gender,
        token,
      },
    });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// Protected route example
app.get("/api/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify token
    return res.status(200).json({ message: "Access granted", user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
