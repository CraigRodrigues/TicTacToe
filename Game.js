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
    this.rounds = 0

    this.board.init()
    console.log(this.board)
  }

  getPlayerNames (playerNumber) {
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

  promptPlayer (callback) {
    // Prompts player for a move
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
      this.placeMark(square)
      callback()
    })
  }

  start () {
    // Prompt player move
    if (this.rounds > 9) {
      return 'DRAW!'
    }

    this.promptPlayer(() => {
      // Check if winner or draw
      if (this.board.winner(this.board.board, this.turn)) {
        this.announceWinner()
        this.gameOver()
      } else {
        this.nextPlayer()
        this.rounds++
        this.start()
      }
    })
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
      mark = '[X]'
    } else {
      mark = '[O]'
    }

    let boardPosition = {
      1: {row: 0, col: 0},
      2: {row: 0, col: 1},
      3: {row: 0, col: 2},
      4: {row: 1, col: 0},
      5: {row: 1, col: 1},
      6: {row: 1, col: 2},
      7: {row: 2, col: 0},
      8: {row: 2, col: 1},
      9: {row: 2, col: 2}
    }

    const { row, col } = boardPosition[square]
    if (this.board.board[row][col] === '[]' && square <= 9 && square > 0) {
      this.board.board[row][col] = mark
    } else {
      console.log('INVALID MOVE, TURN SKIPPED')
    }

    console.log(this.board.board)
  }

  announceWinner (player) {
    // Prints game winner
    let winner
    this.turn === 0 ? winner = this.playerOne : winner = this.playerTwo
    console.log(`WINNER: ${winner}`)
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
        if (response === 'Y') {
          this.rounds = 0
          this.start()
        }
      })
    })
  }
}

module.exports = Game
