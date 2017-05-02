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
    this.rounds = 0
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

  nextPlayer () {
    this.turn === 0 ? this.turn = 1 : this.turn = 0
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

      let players = {
        0: this.playerOne,
        1: this.playerTwo
      }

      rl.question(`Type your move ${players[this.turn]} (1-9): `, (square) => {
        rl.close()
        resolve(square)
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
        console.log('Board', this.board.board)
        while (!this.board.winner(this.board.board, this.turn) && this.rounds < 10) {
          this.promptPlayer()
            .then((square) => this.placeMark(square))
            .then(() => this.board.print())
            // Move to next player
            .then(() => this.nextPlayer())
            .then(this.rounds++)
            .catch(err => console.log(err))
        }
      })
      .then(() => this.announceWinner())
      .then(() => this.gameOver())
      .then((response) => {
        if (response === 'Y') {
          this.start()
        } else {
          throw new Error('Game over')
        }
      })
      .catch(err => console.log(err))
  }

  pickFirstPlayer () {
    // Randomly chooses who plays first
    let index = Math.floor(Math.random())

    // Set first turn index
    index === 0 ? this.turn = 0 : this.turn = 1
    this.printPlayers()
  }

  placeMark (square) {
    let mark
    if (this.turn === 0) {
      mark = 'X'
    } else {
      mark = 'O'
    }

    let boardPosition = {
      1: this.board.board[0][0],
      2: this.board.board[0][1],
      3: this.board.board[0][2],
      4: this.board.board[1][0],
      5: this.board.board[1][1],
      6: this.board.board[1][2],
      7: this.board.board[2][0],
      8: this.board.board[2][1],
      9: this.board.board[2][2]
    }

    boardPosition[square] = mark
  }

  announceWinner (player) {
    // Prints game winner
  }

  gameOver () {
    // Asks if players wish to play again
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question('Play again? (Y/N)', (response) => {
        rl.close()
        resolve(response)
      })
    })
  }
}

module.exports = Game
