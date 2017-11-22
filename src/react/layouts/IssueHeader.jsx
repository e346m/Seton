import React from 'react'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import ListSubheader from 'material-ui/List/ListSubheader'

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
});

class IssueHeader extends React.PureComponent {
  render() {
    return (
      <List className={this.props.classes.root}
        subheader={<ListSubheader>Issue List</ListSubheader>}
      >
        {this.props.children}
      </List>
    )
  }
}

export default withStyles(styles)(IssueHeader)
