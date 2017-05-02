// GAME
// Keeps track of player turns
// Win detection
// Notifies whose turn
// Keeps track of win/losses
// Keeps track of player names
// Randomly picks who goes first

const readline = require('readline')
const Board = require('./Board')

class Game {
  constructor (n) {
    this.board = new Board(3)
    this.turn = 0
    this.game = []
    this.playerOne = ''
    this.playerTwo = ''
    this.active = true
  }

  getPlayerName (playerNumber) {
    // Names of players
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question(`Player ${playerNumber}'s' name?: `, (name) => {
        if (playerNumber === 1) {
          this.playerOne = name
        }
        if (playerNumber === 2) {
          this.playerTwo = name
        }

        rl.close()
        resolve(name)
      })
    })
  }

  printPlayers () {
    console.log(`
      TIC TAC TOE
      -----------
      Player One: ${this.playerOne}
      Player Two: ${this.playerTwo}
    `)
  }

  promptPlayer (board) {
    // Prompts player for a move
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      console.log(`${this.players[this.turn]}'s Play!`)

      rl.question('Type your move (x, y): ', (coords) => {
        rl.close()
        resolve(coords)
      })
    })
  }

  start () {
    // Get the names of our players and pick who plays first
    this.getPlayerName(1)
      .then(() => this.getPlayerName(2))
      .then(() => this.printPlayers())
      // Initialize the board
      .then(() => this.board.init())
      .then(() => console.log(this.board))
      .then(() => {
        // Check for winner
        while (!this.board.winner(this.board.board, this.turn)) {
          this.promptPlayer()
            .then(() => this.board.print())
            // Move to next player
            .then(() => this.nextPlayer())
        }
      })
      .then(() => this.printWinner())
      .then(() => this.playAgain())
      .catch(err => console.log(err))
  }

  pickFirstPlayer () {
    // Randomly chooses who plays first
    let index = Math.floor(Math.random())

    // Set first turn index
    index === 0 ? this.turn = 0 : this.turn = 1
    this.printPlayers()
  }

  placeMark (i, j) {
    let mark
    if (this.turn === 0) {
      mark = 'O'
    } else {
      mark = 'X'
    }

    this.board.board[i][j] = mark
  }

  announceWinner () {
    // Prints game winner
  }

  gameOver () {
    // Asks if players wish to play again
  }
}

module.exports = Game
