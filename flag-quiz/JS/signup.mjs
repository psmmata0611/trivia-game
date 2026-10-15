document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("sign-upForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      // Get values from the input fields
      const name = document.getElementById("name").value;
      const dob = document.getElementById("dob").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const passwordconf = document.getElementById("passwordconf").value;
      const today = new Date();

      // Clear previous error messages
      document.getElementById("usernameError").textContent = "";
      document.getElementById("passwordError").textContent = "";
      document.getElementById("passwordErrorf").textContent = "";
      document.getElementById("dobError").textContent = "";

      let isValid = true;

      const dobDate = new Date(dob);
      if (dobDate > today){
        document.getElementById("dobError").textContent = "Check date of birth";
        isValid = false;
      }
      // Check if username contains both letters and numbers
      let hasLettersAndNumbers = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(username);
      if (username.length < 5 || username.length > 20 || !hasLettersAndNumbers) {
        document.getElementById("usernameError").textContent =
          "Must have letters and numbers.";
        isValid = false;
      }

      // Check if password contains both letters and numbers
      let hasLettersAndNumbers2 = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password);
      if (!hasLettersAndNumbers2) {
        document.getElementById("passwordError").textContent =
          "Must have letters and numbers.";
        isValid = false;
      }

      // Check if both passwords match
      if (password !== passwordconf) {
        document.getElementById("passwordErrorf").textContent =
          "Passwords do not match.";
        isValid = false;
      }


      // Retrieve users array from localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];
      for (let user of users) {
        // Check for existing username
        if (user.username === username) {
          document.getElementById("usernameError").textContent =
            "Username already exists.";
          isValid = false;
          break;
        }
      }

      // If valid, save the new user data
      if (isValid) {
        const userData = {
          name: name,
          dob: dob,
          username: username,
          password: password,
          topScore: 0, // Initialize top score to 0
        };

        // Add new user to users array and save to localStorage
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));

        // Redirect to login page
        window.location.href = "../Pages/login.html";
      }
    });
});


