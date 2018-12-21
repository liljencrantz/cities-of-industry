import React from 'react'
import Button from '@material-ui/core/Button'
import {ImproveAction} from '../../rules/actions'

export default class extends React.Component {
  render() {
    const {game, player, queryUser} = this.props

    const availableImprovements = player.legalImprovements

    const onButtonPress = () => queryUser(availableImprovements)
      .then(imp => {
        const availableTiles = player.getLegalTiles(imp)
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
