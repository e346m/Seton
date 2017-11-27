import React from 'react'
import PropTypes from 'prop-types'
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
  },
  child: {
    margin: 5
  },
})

class IssueHeader extends React.PureComponent {
  state = {
    breadcrumbs: [getRouterState(this.props.children, 'link')('Issue List')]
  }
  getChildContext() {
    return { addBreadCrumb: this.addBreadCrumb }
  }
  addBreadCrumb = (breadcrumb) => {
    this.setState({
      breadcrumbs: this.state.breadcrumbs.concat(['>', breadcrumb])
    })
  }
  initState = (id) => {
    if (id !== 0) return false
    const [head, ...tail] = this.state.breadcrumbs
    this.setState({ breadcrumbs: [head] })
  }
  render() {
    const { classes } = this.props
    return (
      <List className={classes.root}
        subheader={
          <ListSubheader>
            <div className={classes.container}>
              {this.state.breadcrumbs.map((breadcrumb, id) =>
                <div className={classes.child} onClick={e => this.initState(id)}>{breadcrumb}</div>
              )}
            </div>
          </ListSubheader>}
      >
        {this.props.children}
      </List>
    )
  }
}

IssueHeader.childContextTypes = {
  addBreadCrumb: PropTypes.func
}
export default withStyles(styles)(IssueHeader)
