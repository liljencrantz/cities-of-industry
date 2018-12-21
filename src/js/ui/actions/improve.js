import React from 'react'
import Button from '@material-ui/core/Button'
import {ImproveAction} from '../../rules/actions'

export default class extends React.Component {
  render() {
    const {game, player, queryUser} = this.props

    const availableImprovements = new Set(player.getPlayable().map(i => i.id))

    const onButtonPress = () => queryUser(availableImprovements)
      .then(imp => {
        const availableTiles = new Set(game.tiles
          .filter(tile => tile.revealed && tile.improvement == null)
          .filter(tile => game.getAdjecent(tile)
            .filter(tile => tile.improvement != null && tile.owner === player).length > 0)
          .map(tile => tile.id))

        queryUser(availableTiles)
          .then(tile => this.props.onAction(new ImproveAction(game, tile.pos, player, imp)))
      })

    return (
      <Button
        onClick={onButtonPress}
        disabled={availableImprovements.size === 0}>
        Improve
      </Button>)
  }
}
