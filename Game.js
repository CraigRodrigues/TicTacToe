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
    this.winner = ''
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

      rl.question(`Player two's name: `, (answer) => {
        this.players[1] = answer
        console.log(`Thank you ${answer}`)

        rl.pause()
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
    // Checks board for winner
    // Returns name of winner and ends game
    // Return boolean
  }

  promptPlayer () {
    // Prompts player for a move
  }

  start () {
    this.getPlayerNames(this.pickFirstPlayer.bind(this))
    // let rounds = Math.pow(this.board.size(), 2)
    this.board.init()
    console.log(this.board)

    // while (!this.winner()) {
    //   this.promptPlayer() {
    //     // Log name of player to play
    //     // Get coordinates of move
    //   }
    // }

    // Check for winner
  }

  pickFirstPlayer () {
    // Randomly chooses who plays first
    let index = Math.floor(Math.random())

    // Set first turn index
    index === 0 ? this.turn = 0 : this.turn = 1
    this.printPlayers()
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
