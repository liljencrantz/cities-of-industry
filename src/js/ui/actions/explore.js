import React from 'react'
import Button from '@material-ui/core/Button'
import {ExploreAction} from '../../rules/actions'

export default class extends React.Component {
  render() {
    const game = this.props.game
    const onTilePicked = (tile) =>
      this.props.onAction(new ExploreAction(game, tile.pos))

    const friends = game.explorable
        const onButtonPress = () => this.props.onHighlight(friends, onTilePicked)
    return <Button onClick={onButtonPress}>Explore</Button>
  }
}
