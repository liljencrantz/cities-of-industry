import React from 'react'
import NoOp from './noop'
import Explore from './explore'
import Improve from './improve'

export default class extends React.Component {
  render() {
    const actionCallback = this.props.onAction
    const highlightCallback = this.props.onHighlight
    return (<span>
      <NoOp onAction={actionCallback}/>
      <Explore
        onAction={actionCallback}
        onHighlight={highlightCallback}
        game={this.props.game}
        player={this.props.player}
        />
      <Improve
        onAction={actionCallback}
        onHighlight={highlightCallback}
        game={this.props.game}
        player={this.props.player}
        />
      </span>)
  }
}
