const test = require('tape')
const Board = require('./Board')

test('Board', board => {
  let actual = ''
  let expected = ''

  let myBoard = new Board(3)
  myBoard.init()

  actual = myBoard.print()
  expected = JSON.stringify([
    ['[]', '[]', '[]'],
    ['[]', '[]', '[]'],
    ['[]', '[]', '[]']
  ])

  board.ok(actual, expected, 'Should init and print a board of 3x3')

  board.end()
})
