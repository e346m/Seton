import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Grid from 'material-ui/Grid'
import GroupItem from './GroupItem.jsx'

const styles = theme => ({
  root: {
    flexGrow: 1,
    justify: 'flex-start'
  },
  body: {
    marginBottom: 5,
    fontSize: 13,
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
  },
  footer: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0,
    padding: '2rem',
    pointerEvents: 'none',
  },
  add: {
    zIndex: 2,
    pointerEvents: 'auto',
  },
});

class Groups extends React.Component {
  state = {
    groups: '',
  }
  componentDidMount() {
    this.setState({ groups: this.handleGetObject() })
  }
  handleGetObject = () => {
    return JSON.parse(localStorage.getItem('groups')) || {}
  }
  handleDeleteObject = (groups) => (key) => {
    delete groups[key]
    localStorage.setItem('groups', JSON.stringify(groups))
    this.setState({ groups: groups })
  }
  render() {
    const { classes } = this.props
    const { groups } = this.state
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={16}>
            { Object.keys(groups).map((item, index) =>
              <GroupItem key={index} groupName={item} repos={groups[item]} onDelete={this.handleDeleteObject(groups)}/>
            )}
          </Grid>
        </Grid>
        <Grid container justify="flex-end" alignments="flex-end" className={classes.footer}>
          <Link to="/group/new">
            <Button fab color="primary" aria-label ="add" className={classes.add}>
              <AddIcon />
            </Button>
          </Link>
        </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles)(Groups)
