const squares = document.querySelectorAll('.square');
const restartBtn = document.getElementById('restartBtn');
const scoreDisplay = document.getElementById('score');
const leaderboard = document.getElementById('leaderboard');
const sequence = [];
let index = 0;
let memorizeCount = 1;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

// Function to generate a random number between 1 and 9
function getRandomSquare() {
  return Math.floor(Math.random() * 9) + 1;
}

// Function to highlight a square
function highlightSquare(square) {
  square.classList.add('green');
  setTimeout(() => {
    square.classList.remove('green');
  }, 500);
}

// Function to handle square click
function squareClickHandler(event) {
  const squareId = event.target.id;
  if (parseInt(squareId.substring(6)) === sequence[index]) {
    highlightSquare(event.target);
    index++;
    if (index === memorizeCount) {
      index = 0;
      memorizeCount++;
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        updateLeaderboard();
      }
      setTimeout(() => {
        nextRound();
      }, 1000);
    }
  } else {
    alert('Game Over! You made a mistake.');
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      updateLeaderboard();
    }
    resetGame();
  }
}

// Function to start a new round
function nextRound() {
  const newSquare = getRandomSquare();
  sequence.push(newSquare);
  animateSequence(sequence);
}

// Function to animate the sequence
function animateSequence(sequence) {
  let i = 0;
  const interval = setInterval(() => {
    highlightSquare(squares[sequence[i] - 1]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      setTimeout(() => {
        squares.forEach(square => {
          square.classList.remove('green');
        });
      }, 500);
    }
  }, 1000);
}

// Function to reset the game
function resetGame() {
  index = 0;
  memorizeCount = 1;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  sequence.length = 0;
}

// Function to update leaderboard
function updateLeaderboard() {
  leaderboard.textContent = `High Score: ${highScore}`;
}

// Function to handle restart button click
restartBtn.addEventListener('click', () => {
  resetGame();
  nextRound();
});

// Add click event listeners to squares
squares.forEach(square => {
  square.addEventListener('click', squareClickHandler);
});

// Initial setup
updateLeaderboard();
