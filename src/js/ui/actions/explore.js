import React from 'react'
import Button from '@material-ui/core/Button'
import {ExploreAction} from '../../rules/actions'

export default class extends React.Component {
  render() {
    const game = this.props.game
    const actionCallback = this.props.onAction
    const onTilePicked = (tile) => {
      actionCallback(new ExploreAction(game, tile.pos))
      console.log("EXPLORE", tile)
    }
    const friends = new Set(game.tiles
      .filter(tile => !tile.revealed)
      .filter(tile => game.getAdjecent(tile).filter(tile => tile.revealed).length > 0)
      .map(tile => tile.id))
    console.log("friends", friends)
    const onButtonPress = () => this.props.onHighlight(friends, onTilePicked)
    return <Button onClick={onButtonPress}>Explore</Button>
  }
}
