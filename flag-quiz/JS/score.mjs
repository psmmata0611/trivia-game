// Function to load the logged-in user's score
function createLeaderboard() {
  // Retrieve the current user's information from sessionStorage
  const userArray = JSON.parse(localStorage.getItem("users") || "[]");

  //sort highest scores to the score board
  userArray.sort((a, b) => b.topScore - a.topScore);

  // Select the tbody of the scoreboard to display the score
  const tbody = document.querySelector("#scoreboard tbody");
  tbody.innerHTML = "";
  for (let users of userArray) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${users.username}</td>
        <td>${users.topScore}</td>`;
    tbody.appendChild(row);
  }
}

// Load user's high score on page load
window.onload = createLeaderboard;
