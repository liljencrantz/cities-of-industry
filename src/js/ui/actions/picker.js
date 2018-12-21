import React from 'react'
import NoOp from './noop'
import Explore from './explore'
import Improve from './improve'

export default class extends React.Component {
  render() {
    const actionCallback = this.props.onAction
    const queryUser = this.props.queryUser
    return (<span>
      <NoOp onAction={actionCallback}/>
      <Explore
        onAction={actionCallback}
        queryUser={queryUser}
        game={this.props.game}
        player={this.props.player}
        />
      <Improve
        onAction={actionCallback}
        queryUser={queryUser}
        game={this.props.game}
        player={this.props.player}
        />
      </span>)
  }
}
