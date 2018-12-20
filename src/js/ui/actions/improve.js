import React from 'react'
import Button from '@material-ui/core/Button'
import {ImproveAction} from '../../rules/actions'

export default class extends React.Component {
  render() {
    const {game, player, onHighlight} = this.props

    const onHandPicked = (improvement) => {
      const availableTiles = new Set(game.tiles
        .filter(tile => tile.revealed && tile.improvement == null)
        .filter(tile => game.getAdjecent(tile)
          .filter(tile => tile.improvement != null && tile.owner == player).length > 0)
        .map(tile => tile.id))

      const onTilePicked = (tile) => {
        this.props.onAction(new ImproveAction(game, tile.pos, player, improvement))
      }
      onHighlight(availableTiles, onTilePicked)
    }

    const availableImprovements =
      new Set(player.getPlayable().map(i => i.id))
    const onButtonPress = () => onHighlight(availableImprovements, onHandPicked)

    const button = (
      <Button
        onClick={onButtonPress}
        disabled={availableImprovements.size == 0}
      >
        Improve
      </Button>)
    return button
  }
}
