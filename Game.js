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

  getPlayerNames (callback) {
    // Names of players
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question(`Player one's name: `, (answer) => {
      this.players[0] = answer
      console.log(`Thank you ${answer}`)
      rl.pause()

      rl.question(`Player two's name: `, (answer) => {
        this.players[1] = answer
        console.log(`Thank you ${answer}`)
        rl.pause()

        rl.close()
        callback()
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
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    console.log(`${this.players[this.turn]}'s Play!`)

    rl.question('Type your move (x, y): ', (coords) => {

      this.placeMark(coords)
      rl.close()
    })
  }

  start () {
    // Get the names of our players and pick who plays first
    this.getPlayerNames(this.pickFirstPlayer.bind(this))

    // Initialize the board
    this.board.init()

    // Print the blank board
    console.log(this.board)

    // Check for winner
    console.log(this)
    while (!this.winner()) {
      this.board.print()
      this.promptPlayer()

      // Move to next player
      this.turn === 0 ? this.turn = 1 : this.turn = 0
    }
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
