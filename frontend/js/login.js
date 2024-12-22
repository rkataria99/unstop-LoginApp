function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.querySelector(".eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "images/eyeoff.png"; // Change to your 'eye off' icon path
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "images/eyei.png"; // Change to your 'eye on' icon path
  }
}

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from submitting

  console.log("Form submission intercepted");

  // Get form values
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Debugging - check values
  console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

  // Validation checks
  if (username !== "emilys") {
    console.log("Invalid username"); // Debugging message
    alert("Invalid username. Only 'emilys' is allowed.");
    return; // Stop further execution if validation fails
  }

  if (!email.match(/^\S+@\S+\.\S+$/)) {
    console.log("Invalid email format"); // Debugging message
    alert("Invalid email format.");
    return; // Stop further execution if validation fails
  }

  if (password.length < 8) {
    console.log("Password too short"); // Debugging message
    alert("Password must be at least 8 characters long.");
    return; // Stop further execution if validation fails
  }

  // If all validations pass, proceed with login
  const userData = {
    username,
    password,
    email,
  };

  try {
    // Send POST request to backend
    const response = await fetch('https://unstop-login-app.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      // Save user data and token in localStorage if login is successful
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
});
