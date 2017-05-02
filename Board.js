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

  print () {
    return this.board
  }

  size () {
    return this.size
  }
}

module.exports = Board
