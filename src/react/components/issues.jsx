import React from 'react'
import IssueList from './IssueList.jsx'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ListSubheader from 'material-ui/List/ListSubheader'

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
});

class Issues extends React.PureComponent {
  handleRepo = (name, label) => {
    const val = name.split('/')
    return val.concat(label)
  }
  render() {
    const _repo = this.props.location.state.repos.map(repo =>
      this.handleRepo(repo.name, repo.label)
    )
    return (
      <List className={this.props.classes.root}
        subheader={<ListSubheader>Issue List</ListSubheader>}
      >
        { _repo.map(r =>
          <IssueList owner={r[0]} repository={r[1]} labels={r[2]} />
        )}
      </List>
    )
  }
}
export default withStyles(styles)(Issues)
