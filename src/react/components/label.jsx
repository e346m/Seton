import React from 'react'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Input from 'material-ui/Input'

// TODO triger method for label
export default class Label extends React.Component {
  state = {
    label: '',
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.labels !== nextProps.labels) return true
    if (this.state.label !== nextState.label) return true
    return false
  }
  handleRepoLabelChange = (idx) => (e) => {
    this.setState({ label: e.target.value })
  }
  render() {
    return (
      <div>
        <Select value={this.state.label}
          onChange={this.handleRepoLabelChange(this.props.idx)}
          input={<Input id="label" value={this.state.label}/>}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.props.labels.map(l =>
            <MenuItem value={l}>{l}</MenuItem>
          )}
        </Select>
      </div>
    )
  }
}
