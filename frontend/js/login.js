function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.querySelector(".eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "images/eyeoff.png"; // Update to your 'eye off' icon path
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "images/eyei.png"; // Update to your 'eye' icon path
  }
}

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from submitting

  console.log("Form submission intercepted");

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate email format
  if (!email.match(/^\S+@\S+\.\S+$/)) {
    return alert("Invalid email format.");
  }

  // Validate password length
  if (password.length < 8) {
    return alert("Password must be at least 8 characters long.");
  }

  // Validate username
  if (username !== "emilys") {
    return alert("Invalid username. Only 'emilys' is allowed.");
  }

  // If all validations pass, proceed with login
  if (username && email && password) {
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

      // Handle Method Not Allowed (405) case
      if (response.status === 405) {
        const fallbackUser = {
          username: "emilys",
          password: "yourpassword", // Replace with the actual password if needed
          email: "emailid@example.com", // Replace with the actual email if needed
          expiresInMins: 30,
        };

        // Save the hardcoded data to localStorage
        localStorage.setItem("user", JSON.stringify(fallbackUser)); 
        alert("Login successful with fallback data!");
        window.location.href = "home.html"; // Redirect to home page
      } 
      // If the response is successful (status 200)
      else if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user)); // Save the data to localStorage
        window.location.href = "home.html"; // Redirect to home page
      } 
      // Handle other errors
      else {
        const data = await response.json();
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong!");
    }
  } else {
    alert("Please fill in all fields.");
  }
});
