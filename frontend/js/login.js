document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username !== "emilys") return alert("Invalid username. Only 'emilys' is allowed.");
  if (!email.match(/^\S+@\S+\.\S+$/)) return alert("Invalid email format.");
  if (password.length < 8) return alert("Password must be at least 8 characters long.");

  if (username && email && password) {
    // Sending POST request to the backend login API
    const userData = {
      username,
      password,
      email,
    };

    try {
      const response = await fetch('https://unstop-login-app.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Storing user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); // Save the data to localStorage
        window.location.href = "home.html"; // Redirect to home page
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong!");
    }
  } else {
    alert("Please fill in all fields.");
  }
});
