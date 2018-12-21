import React from 'react'
import Button from '@material-ui/core/Button'
import {ImproveAction} from '../../rules/actions'

export default class extends React.Component {
  render() {
    const {game, player, onHighlight} = this.props

    const onHandPicked = (improvement) => {
      const availableTiles = player.getLegalTiles(improvement)

      const onTilePicked = (tile) => {
        this.props.onAction(new ImproveAction(game, tile.pos, player, improvement))
      }
      onHighlight(availableTiles, onTilePicked)
    }

    const availableImprovements = player.legalImprovements
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
