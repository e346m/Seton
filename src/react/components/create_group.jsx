import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Save from 'material-ui-icons/Save';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
})

// data struct will be handled with graphql query and its object
class CreateGroup extends React.Component {
  state = {
    group_label: '',
    repos: '',
  }
  handleChange = e => {
    this.setState({ group_label: e.target.value })
  }
  handleSave = () => {
    const {group_label, repos} = this.state
    const groups = { [group_label]: repos }
    localStorage.setItem('groups', JSON.stringify(groups))
    this.props.history.replace('/groups')
  }
  render() {
    const {classes} = this.props
    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="group-label">Group Label</InputLabel>
          <Input id="group-label" value={this.state.group_label} onChange={this.handleChange} />
        </FormControl>
        <Button className={classes.button} raised dense onClick={this.handleSave}>
          <Save className={classes.leftIcon} />
          Save
        </Button>
      </div>
    )
  }
}
export default withStyles(styles)(CreateGroup)
