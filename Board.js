// BOARD
// Creates fresh board
// Rotates before for stretch goals

class Board {
  constructor (n = 3) {
    this.size = n
    this.board = null
  }

  init () {
    // Creates board of n x n
    let cell = '[]'
    let board = []

    for (let i = 0; i < this.size; i++) {
      let row = []

      for (let j = 0; j < this.size; j++) {
        row.push(cell)
      }

      board.push(row)
    }

    this.board = board
  }

  winner (board, player) {
    // Assuming 3x3 board
    let mark
    player === 1 ? mark = '[X]' : mark = '[O]'

    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === mark && board[i][1] === mark && board[i][2] === mark) {
        return true
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === mark && board[1][i] === mark && board[2][i] === mark) {
        return true
      }
    }

    // Check diagonal
    if (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) {
      return true
    }
    if (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark) {
      return true
    }

    return false
  }

  print () {
    return this.board
  }

  size () {
    return this.size
  }
}

module.exports = Board
