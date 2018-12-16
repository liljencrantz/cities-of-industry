import React from 'react'
import Button from '@material-ui/core/Button'
import {NothingAction} from '../../rules/actions'

export default class extends React.Component {
  render() {
    const callback = () => this.props.onAction(new NothingAction())
    return <Button onClick={callback}>Do nothing</Button>
  }
}
