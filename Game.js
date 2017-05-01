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
    this.game = []
    this.winner = ''
    this.playerOne = ''
    this.playerTwo = ''
    this.active = true
  }

  getPlayerNames () {
    // Names of players
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question(`Player one's name: `, (answer) => {
      this.playerOne = answer
      console.log(`Thank you ${answer}`)

      rl.question(`Player two's name: `, (answer) => {
        this.playerTwo = answer
        console.log(`Thank you ${answer}`)

        rl.close()
      })
    })
  }

  printPlayers () {
    return [this.playerOne, this.playerTwo]
  }

  winner () {
    // Checks board for winner
    // Returns name of winner and ends game
  }

  start () {
    // Starts game
  }

  pickFirstPlayer () {
    // Randomly chooses who plays first
  }

  placeMark (i, j) {
    // Puts a mark at the coordinates specified by the player
  }

  announceWinner () {
    // Prints game winner
  }

  gameOver () {
    // Asks if players wish to play again
  }
}

module.exports = Game
