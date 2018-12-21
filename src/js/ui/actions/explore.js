import React from 'react'
import Button from '@material-ui/core/Button'
import {ExploreAction} from '../../rules/actions'

export default class extends React.Component {
  render() {
    const {game, queryUser} = this.props
    const friends = new Set(game.tiles
      .filter(tile => !tile.revealed)
      .filter(tile => game.getAdjecent(tile).filter(tile => tile.revealed).length > 0)
      .map(tile => tile.id))
    const onButtonPress = () => queryUser(friends)
      .then(tile => this.props.onAction(new ExploreAction(game, tile.pos)))
    return <Button
      onClick={onButtonPress}>
      disabled={friends.size === 0}>
      Explore
    </Button>
  }
}
