document.addEventListener("DOMContentLoaded", () => {
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const userGender = document.getElementById("userGender");
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData) {
    userName.textContent = "Michael Dam"; 
    userEmail.textContent = `Email: ${userData.email}`;
    userGender.textContent = `Gender: Female`; 
  } else {
    window.location.href = "index.html"; 
  }

  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html"; 
  });
});
