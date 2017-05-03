const test = require('tape')
const Board = require('./Board')

test('Board', board => {
  let actual = ''
  let expected = ''

  let myBoard = new Board(3)
  myBoard.init()

  actual = myBoard.print()
  expected = `
      GAME BOARD
      ----------
      [] | [] | []
      ---------------
      [] | [] | []
      ---------------
      [] | [] | []
    `

  board.deepEqual(actual, expected, 'Should init and print a board of 3x3')

  myBoard.board = [
    ['[X]', '[X]', '[X]'],
    ['[]', '[]', '[]'],
    ['[]', '[]', '[]']
  ]

  actual = myBoard.winner(myBoard.board, 0)
  expected = true

  board.equal(actual, expected, 'Should return true for a row')

  myBoard.board = [
    ['[O]', '[]', '[]'],
    ['[O]', '[]', '[]'],
    ['[O]', '[]', '[]']
  ]

  actual = myBoard.winner(myBoard.board, 1)
  expected = true

  board.equal(actual, expected, 'Should return true for columns')

  myBoard.board = [
    ['[O]', '[]', '[]'],
    ['[]', '[O]', '[]'],
    ['[]', '[]', '[O]']
  ]

  actual = myBoard.winner(myBoard.board, 1)
  expected = true

  board.equal(actual, expected, 'Should return true for diagonal')

  board.end()
})
