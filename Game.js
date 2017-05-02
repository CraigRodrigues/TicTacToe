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
    this.players = []
    this.playerOne = ''
    this.playerTwo = ''
    this.active = true
  }

  getPlayerOneName (callback) {
    // Names of players
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question('Player one\'s name: ', (name) => {
        rl.close()
        resolve(name)
      })
    })
  }

  printPlayers () {
    console.log(`
      TIC TAC TOE
      -----------
      Player One: ${this.players[0]}
      Player Two: ${this.players[1]}
    `)
  }

  winner () {
    if (this.turn === 0) {
      return false
    } else {
      return true
    }
  }

  promptPlayer () {
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
    this.getPlayerOneName()
      .then(name => {
        console.log(name)
      })

    // Initialize the board
    // this.board.init()

    // // Print the blank board
    // console.log(this.board)

    // // Check for winner
    // console.log(this)
    // while (!this.winner()) {
    //   this.board.print()
    //   this.promptPlayer()

    //   // Move to next player
    //   this.turn === 0 ? this.turn = 1 : this.turn = 0
    // }
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
