function getStoredScores() {
  const storedPlayerScore = localStorage.getItem("playerScore");
  const storedComputerScore = localStorage.getItem("computerScore");

  return {
    playerScore: storedPlayerScore ? parseInt(storedPlayerScore) : 0,
    computerScore: storedComputerScore ? parseInt(storedComputerScore) : 0,
  };
}

function updateLocalStorage() {
  localStorage.setItem("playerScore", playerScore.toString());
  localStorage.setItem("computerScore", computerScore.toString());
}

let { playerScore, computerScore } = getStoredScores();

function generateComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);
  const computerChoice = options[randomIndex];
  return computerChoice;
}

function getResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    return "You win!";
  } else {
    computerScore++;
    return "Computer wins!";
  }
}

function showResult(playerChoice, computerChoice, resultMsg) {
  updateLocalStorage();
  const resultElement = document.querySelector(".result");
  resultElement.innerHTML = `
      <p style="color: blue;">Player chose: ${playerChoice}</p>
      <p style="color: green;">Computer chose: ${computerChoice}</p>
      <p style="color: ${
        resultMsg.includes("win")
          ? "green"
          : resultMsg.includes("tie")
          ? "orange"
          : "red"
      };">Result: ${resultMsg}</p>
      <p style="color: ${
        playerScore > computerScore
          ? "green"
          : playerScore < computerScore
          ? "red"
          : "black"
      };">Player Score: ${playerScore}</p>
      <p style="color: ${
        playerScore < computerScore
          ? "green"
          : playerScore > computerScore
          ? "red"
          : "black"
      };">Computer Score: ${computerScore}</p>
  `;
}

document.getElementById("resetButton").addEventListener("click", function () {
  // Reset scores
  playerScore = 0;
  computerScore = 0;

  // Update local storage
  updateLocalStorage();

  // Update the displayed scores
  showResult("", "", "Scores reset");
});
