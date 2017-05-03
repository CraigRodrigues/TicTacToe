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
    this.board.print()
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

    return (`
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
      if (square > 9 || square < 1) {
        console.log('Invalid Entry: Please try again! (1-9)')
        this.promptPlayer(this.gameRound.bind(this))
      } else {
        this.placeMark(square)
        callback()
      }
    })
  }

  gameRound () {
    // Check if winner or draw
    if (this.board.winner(this.board.board, this.turn)) {
      this.announceWinner()
      this.gameOver()
    } else {
      this.nextPlayer()
      this.rounds++
      this.start()
    }
  }

  start () {
    // Prompt player move
    if (this.rounds > 9) {
      return 'DRAW!'
    }

    this.promptPlayer(this.gameRound.bind(this))
  }

  pickFirstPlayer () {
    // Randomly chooses who plays first
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
    let index = getRandomInt(0, 1)

    // Set first turn index
    index === 0 ? this.turn = 0 : this.turn = 1

    return index
  }

  placeMark (square) {
    let mark
    const boardPosition = {
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

    let { row, col } = boardPosition[square]
    this.turn === 0 ? mark = '[X]' : mark = '[O]'

    if (square > 9 || square < 1 || this.board.board[row][col] !== '[]') {
      console.log('Piece already there. Skipping your turn!')
      this.board.print()
      return
    } else {
      this.board.board[row][col] = mark
    }

    this.board.print()
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

      rl.question('Play again? (Y/N) ', (response) => {
        rl.close()
        if (response === 'Y') {
          this.board.init()
          this.rounds = 0
          this.start()
        }
      })
    })
  }
}

module.exports = Game
