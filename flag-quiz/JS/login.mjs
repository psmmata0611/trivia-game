document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      // Get values from the input fields
      const name = document.getElementById("name").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Clear previous error messages
      document.getElementById("usernameError").textContent = "";
      document.getElementById("passwordError").textContent = "";

      // Retrieve users from local storage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Find the user in the users array
      let user = users.find((user) => user.username === username);

      // Validation: Check username and password match
      if (!user) {
        document.getElementById("usernameError").textContent =
          "User not found.";
      } else if (user.password !== password || user.name !== name) {
        document.getElementById("passwordError").textContent =
          "Incorrect password.";
      } else {
        // Save the logged-in user's to sessionStorage
        const userLogin = {
          name: user.name,
          username: user.username,
          password: user.password,
          topScore: user.topScore,
        };
        sessionStorage.setItem("users", JSON.stringify(userLogin));

        // Redirect to game page
        window.location.href = "../Pages/game.html";
      }
    });
});
