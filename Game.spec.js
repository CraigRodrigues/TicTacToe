const test = require('tape')
const Game = require('./Game')

test('Game', game => {
  let actual = ''
  let expected = ''

  let myGame = new Game()

  // actual = myGame.getPlayerNames()
  // expected = ['Craig', 'Fred']

  // game.deepEqual(actual, expected, 'Should accept names of players and return them')

  myGame.nextPlayer()
  actual = myGame.turn
  expected = 1

  game.equal(actual, expected, 'Should flip player turns once')

  myGame.nextPlayer()
  actual = myGame.turn
  expected = 0

  game.equal(actual, expected, 'Should flip player turns twice')

  myGame.playerOne = 'Craig'
  myGame.playerTwo = 'Fred'
  actual = myGame.printPlayers()
  expected = `
      TIC TAC TOE
      -----------
      Player One: Craig
      Player Two: Fred
    `
  game.equal(actual, expected, 'Names should print out properly')

  // If random it should include 0 and 1 in the array out of 6 chances
  actual = [
    myGame.pickFirstPlayer(), myGame.pickFirstPlayer(), myGame.pickFirstPlayer(),
    myGame.pickFirstPlayer(), myGame.pickFirstPlayer(), myGame.pickFirstPlayer()
  ]
  expected = true

  game.equal(actual.includes(0), expected, 'Expect game to randomly pick player 1')
  game.equal(actual.includes(1), expected, 'Expect game to randomly pick player 2')

  game.end()
})
