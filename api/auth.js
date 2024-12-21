const users = [
    { username: "emilys", password: "yourpassword", email: "emilys@example.com", gender: "female" }
  ];
  
  module.exports = async (req, res) => {
    if (req.method === "POST") {
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
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  };
  