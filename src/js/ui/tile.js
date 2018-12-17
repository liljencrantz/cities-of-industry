import React from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { createMuiTheme, withStyles } from '@material-ui/core/styles'

const styles = {
  disabled: {
    backgroundColor: 'gray',
  },
  highlighted: {
  },
  normal: {
  },
}

class Tile extends React.Component {

  render() {
    const { disabled, tile, classes, highlight } = this.props;
    const className = disabled?this.props.classes.disabled:
      (highlight?this.props.classes.highlighted:this.props.classes.normal)
    let description = '?'

    if(tile.revealed) {
      description = tile.type.name
    }

    return (
      <Card
        className={className}
        onClick={() => this.props.onSelect(tile)}
        >
        <CardContent>
          {description}
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Tile);
