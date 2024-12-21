document.addEventListener("DOMContentLoaded", () => {
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const userGender = document.getElementById("userGender");
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData) {
    userName.textContent = "Michael Dam"; // Hardcoded username
    userEmail.textContent = `Email: ${userData.email}`;
    userGender.textContent = `Gender: Female`; // Hardcoded gender
  } else {
    window.location.href = "index.html"; // Redirect to login page if no user data
  }

  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html"; // Redirect to login page after logout
  });
});
