// Function to toggle the visibility of the password input
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.querySelector(".eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text"; // Change to 'text' to show password
    eyeIcon.src = "images/eyeoff.png"; // Update to your 'eye off' icon path
  } else {
    passwordInput.type = "password"; // Change back to 'password' to hide
    eyeIcon.src = "images/eyei.png"; // Update to your 'eye' icon path
  }
}

// Add event listener for the login form submission
document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  console.log("Form submission intercepted");

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Username validation on submit
  if (username !== "emilys") {
    alert("Invalid username. Only 'emilys' is allowed.");
    return;  // Stop form submission if username is invalid
  }

  // Email validation
  if (!email.match(/^\S+@\S+\.\S+$/)) {
    alert("Invalid email format.");
    return;  // Stop form submission if email is invalid
  }

  // Password validation
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;  // Stop form submission if password is invalid
  }

  if (username && email && password) {
    // Prepare data for POST request
    const userData = {
      username,
      password,
      email,
    };

    try {
      // Sending POST request to the backend login API
      const response = await fetch('https://unstop-login-app.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store the token and user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); // Save user data
        localStorage.setItem("token", data.user.token); // Save JWT token

        alert("Login successful");
        window.location.href = "home.html"; // Redirect to home page
      } else {
        alert(data.message); // Show error message from the server
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong!");
    }
  } else {
    alert("Please fill in all fields.");
  }
});
