function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.querySelector(".eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "images/eyeoff.png"; 
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "images/eyei.png"; 
  }
}

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate username, email, and password
  if (username !== "emilys") return alert("Invalid username. Only 'emilys' is allowed.");
  if (!email.match(/^\S+@\S+\.\S+$/)) return alert("Invalid email format.");
  if (password.length < 8) return alert("Password must be at least 8 characters long.");

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

    console.log("Response status:", response.status); 

    if (response.status === 405) {
      alert("API returned 405 - Using fallback data!"); 

      const fallbackUser = {
        username: "emilys",
        password: "yourpassword", 
        email: "emailid@example.com", 
        expiresInMins: 30,
      };

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(fallbackUser));
      window.location.href = "home.html"; 
    } else if (response.status === 200) {
      // Handle successful login
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user)); 
      window.location.href = "home.html"; // Redirect to home page
    } else {
      // Show the error message
      const data = await response.json();
      alert(data.message || "Something went wrong!");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Something went wrong!");
  }
});
