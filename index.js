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

// Run index.js
// Game starts by creating new Game instance
// Game instance creates new board instance
// Players choose a space to place their piece
// Continue until DRAW or WINNER
// Once a player has won will offer the option to play again or quit

const Game = require('./Game')

let myGame = new Game()

// START THE GAME
myGame.start()
