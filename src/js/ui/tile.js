import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {withStyles} from '@material-ui/core/styles'

const styles = {
  disabled: {
    backgroundColor: 'gray',
  },
  highlighted: {
    backgroundColor: 'white',
  },
  normal: {
    backgroundColor: 'white',
  }
}

class Tile extends React.Component {

  render() {
    const {disabled, tile, classes, highlight, onSelect} = this.props
    const className = disabled ? classes.disabled :
      (highlight ? classes.highlighted : classes.normal)
    let description = '?'
    let imp = ''

    if (tile.revealed) {
      description = tile.type.name
      if (tile.improvement != null) {
        imp = `${tile.improvement.type.name} (${tile.owner.name})`
      }
    }

    return (
      <Card
        className={className}
        onClick={() => disabled ? null : onSelect(tile) }
      >
        <CardContent>
          <div>
            {description}
          </div>
          <div>
            {imp}
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Tile)
