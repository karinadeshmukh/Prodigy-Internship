document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const resetButton = document.getElementById("reset");

  let currentPlayer = "X";
  let gameActive = true;
  let gameState = Array(9).fill("");

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const renderBoard = () => {
    board.innerHTML = "";
    gameState.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (cell) {
        cellElement.classList.add("taken");
        cellElement.textContent = cell;
      }
      cellElement.addEventListener("click", () => handleCellClick(index));
      board.appendChild(cellElement);
    });
  };

  const handleCellClick = (index) => {
    if (!gameActive || gameState[index]) return;

    gameState[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = gameActive ? `Player ${currentPlayer}'s turn` : "";
    renderBoard();
  };

  const checkWinner = () => {
    let roundWon = false;
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      status.textContent = `Player ${currentPlayer} has won!`;
      gameActive = false;
    } else if (!gameState.includes("")) {
      status.textContent = "It's a draw!";
      gameActive = false;
    }
  };

  const resetGame = () => {
    currentPlayer = "X";
    gameActive = true;
    gameState = Array(9).fill("");
    status.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
  };

  resetButton.addEventListener("click", resetGame);

  // Initialize the game
  resetGame();
});
