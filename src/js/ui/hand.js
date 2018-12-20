import React from 'react';
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

function HandCard(props) {
  const {disabled, item, classes, highlight, onSelect} = props;
  const className = disabled ? classes.disabled :
    (highlight ? classes.highlighted : classes.normal)
  const description = item.type.name
  return (
    <Card
      className={className}
      onClick={() => disabled ? null : onSelect(item) }
    >
      <CardContent>
        {description}
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(HandCard)
