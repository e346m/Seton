import React from 'react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import List from 'material-ui/List'
import ListSubheader from 'material-ui/List/ListSubheader'
import { getRouterState } from '../utility.js'

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
  }
});

class IssueHeader extends React.PureComponent {
  state = {
    breadcrumbs: [getRouterState(this.props.children, 'link')(<div>Issue List</div>)]
  }
  render() {
    const { classes } = this.props
    return (
      <List className={classes.root}
        subheader={
          <ListSubheader>
            <div className={classes.container}>
              {this.state.breadcrumbs.map(breadcrumb =>
                breadcrumb
              )}
            </div>
          </ListSubheader>}
      >
        {this.props.children}
      </List>
    )
  }
}

export default withStyles(styles)(IssueHeader)
