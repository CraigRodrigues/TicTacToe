const test = require('tape')
const Game = require('./Game')

test('Game', game => {
  let actual = ''
  let expected = ''

  let myGame = new Game()

  actual = myGame.getPlayerNames()
  expected = ['Craig', 'Fred']

  game.deepEqual(actual, expected, 'Should accept names of players and return them')

  game.end()
})
