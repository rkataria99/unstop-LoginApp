const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

// Hardcoded user credentials (replace with real DB logic in production)
const users = [
  { username: "emilys", password: "yourpassword", email: "emilys@example.com", gender: "female" }
];

// Simulate a login API endpoint
app.post("/auth/login", (req, res) => {
  const { username, password, email } = req.body;
  
  // Validate input data
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Check if the user exists (hardcoded logic, replace with DB check in production)
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // Simulating token and user response
    const expiresInMins = 30; // optional
    const token = "your-jwt-token"; // You should use a real JWT here in production

    // Send a successful response with user data and token
    return res.status(200).json({
      user: {
        username: user.username,
        email: email || user.email, // email is optional
        gender: user.gender,
        expiresInMins,
        token, // simulated token
      },
    });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// Default endpoint message
app.get("/", (req, res) => {
  res.send("Welcome to the login API!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
