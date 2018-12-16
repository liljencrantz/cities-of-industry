import React from 'react';
import Tile from './tile'
import ActionPicker from './actions/picker'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      game: props.game,
      highlight: new Set(),
      highlightCallback: null,
    }
  }

  render() {
    const game = this.state.game

    const actionCallback = (action) => {
      const actions = [
        action,
        this.props.ai[0].action(),
        this.props.ai[1].action(),
        this.props.ai[2].action()]
      game.perform(actions)
      this.setState({
        ...this.state,
        highlight: new Set(),
        highlightCallback: null,
        game: game})
    }

    const highlightCallback = (highlight, callback) => {
      this.setState({
        ...this.state,
        highlight: highlight,
        highlightCallback: callback
      })
    }

    return (
      <span>
        Turn {game.turn}
        <table>
        {
          game.getRows().map(row => (<tr>
          {row.map(tile => (
            <td>
              <Tile
                tile={tile}
                disabled={
                  (this.state.highlightCallback != null) &&
                  !this.state.highlight.has(tile.id)}
                highlight={this.state.highlight.has(tile.id)}
                onSelect={this.state.highlightCallback}
                />
            </td>))
          }
          </tr>))
        }
        </table>
        <ActionPicker
          game={game}
          player={game.countries[0]}
          onAction={actionCallback}
          onHighlight={highlightCallback}
          />
      </span>
    )
  }
}
