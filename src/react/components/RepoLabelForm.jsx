import React from 'react'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Input from 'material-ui/Input'

export default class RepoLabelForm extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.labels !== nextProps.labels) return true
    if (this.props.label !== nextProps.label) return true
    return false
  }
  _handleRepoLabelChange = e => {
    this.props.handleRepoLabelChange(e)
  }
  render() {
    return (
      <div>
        <Select value={this.props.label}
          onChange={this._handleRepoLabelChange}
          input={<Input id="label" value={this.props.label}/>}
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
