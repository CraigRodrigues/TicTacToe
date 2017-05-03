// Tic Tac Toe

// Expected Features
// ===============
// * Minimal UI that redraws the board and makes clear whose turn it is, each turn.
// * Players can submit moves (assume, admittedly unrealistically, that both players are sitting at the same keyboard).
// * Win detection - detect and display who won

// Bonus / Stretch goals (any or all of the following)
// =======================================
// * Structure your code such that the UI can be turned easily into a native mobile app (iOS say) without having to rewrite the core game logic.
// * Implement win detection with a functional rather than iterative style.
// * Between moves, rotate the board 90 degrees counter-clockwise. The moves "fall" due to "gravity", post-rotation.

const Game = require('./Game')

let myGame = new Game()

// START THE GAME
myGame.getPlayerNames(1)
  .then(() => myGame.getPlayerNames(2))
  .then(() => myGame.pickFirstPlayer())
  .then(() => myGame.start())
  .catch(err => console.log(err))
