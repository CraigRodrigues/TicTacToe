const test = require('tape')
const Game = require('./Game')

test('Game', game => {
  let actual = ''
  let expected = ''

  let myGame = new Game()

  board.deepEqual(actual, expected, 'Should init and print a board of 3x3')

  board.end()
})
