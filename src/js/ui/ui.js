import React from 'react'
import Tile from './tile'
import ActionPicker from './actions/picker'
import HandItem from './hand'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {withStyles} from '@material-ui/core/styles'

const styles = {
  handBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: 'white',
    color: 'black',
  },
  board: {
    backgroundColor: '#ddd',
    paddingTop: '5em',
    paddingBottom: '5em',
    paddingLeft: '1em',
    paddingRight: '1em',
    margin: '0',
  },
}

class UI extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      game: props.game,
      highlight: new Set(),
      onTileSelect: this.showTileCallback(),
      onHandSelect: this.showHandCallback(),
    }
  }

  showTileCallback() {
    return (tile) => {
      console.log(tile)
    }
  }

  showHandCallback() {
    return (imp) => {
      console.log(imp)
    }
  }

  render() {
    const {game, highlight} = this.state
    const {classes} = this.props
    const player = game.players[0]

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
        onTileSelect: this.showTileCallback(),
        onHandSelect: this.showHandCallback(),
        game: game
      })
    }

    const highlightCallback = (highlight, callback) => {
      if (highlight.size == 0) {
        this.setState({
          ...this.state,
          highlight: new Set(),
          onTileSelect: this.showTileCallback(),
          onHandSelect: this.showHandCallback(),
        })
      } else {
        this.setState({
          ...this.state,
          highlight: highlight,
          onTileSelect: callback,
          onHandSelect: callback,
        })
      }
    }

    return (
      <span>
        <AppBar position="fixed">
          <Toolbar>

            Turn {game.turn}

            <ActionPicker
              game={game}
              player={player}
              onAction={actionCallback}
              onHighlight={highlightCallback}
            />

          </Toolbar>
        </AppBar>
        <table className={classes.board}>
          <tbody>
        {
          game.rows.map(row => (<tr>
            {row.map(tile => (
              <td>
                <Tile
                  tile={tile}
                  disabled={
                    (highlight.size > 0) &&
                    !highlight.has(tile.id)}
                  highlight={highlight.has(tile.id)}
                  onSelect={this.state.onTileSelect}
                />
              </td>))
            }
          </tr>))
        }
        </tbody>
        </table>

        <AppBar position="fixed" className={classes.handBar}>
          <Toolbar>
            {
              player.hand.map(imp => (
                <HandItem
                  item={imp}
                  disabled={
                    (highlight.size > 0) &&
                    !highlight.has(imp.id)}
                  highlight={highlight.has(imp.id)}
                  onSelect={this.state.onHandSelect}
                />))
            }
          </Toolbar>
        </AppBar>
      </span>
    )
  }
}

export default withStyles(styles)(UI)