import Game from './js/rules/game'
import UI from './js/ui/ui'
import React from 'react'
import ReactDOM from 'react-dom'
import AI from './js/ai/ai'

function main() {
  const game = new Game(document)
  const ai = [
    new AI(game, game.players[1]),
    new AI(game, game.players[2]),
    new AI(game, game.players[3])
  ]
  ReactDOM.render(<UI game={game} ai={ai}/>, document.querySelector('#ui'))
}

main()
