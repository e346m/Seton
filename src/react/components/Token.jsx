import React from 'react'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'
import Save from 'material-ui-icons/Save'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Token extends React.PureComponent {
  state = {
    token: '',
    url: <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">Creating a personal access token for the command line</a>
  }
  handleChange = (e) => {
    this.setState({ token: e.target.value })
  }
  handleSave = () => {
    localStorage.setItem('token', this.state.token)
    this.props.history.replace('/')
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="token">API Token</InputLabel>
            <Input id="token" value={this.state.token} onChange={this.handleChange} />
            <FormHelperText>Set your Github API Token along with {this.state.url}</FormHelperText>
          </FormControl>
          <Button className={classes.button} raised dense onClick={this.handleSave}>
            <Save className={classes.leftIcon} />
            Save
          </Button>
      </div>
    )
  }
}
export default withStyles(styles)(Token)
