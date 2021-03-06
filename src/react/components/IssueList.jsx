import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import List, { ListItem,  ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Badge from 'material-ui/Badge';
import ArchiveIcon from 'material-ui-icons/Archive'
import { displayTime } from '../utility.js'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class IssueList extends React.PureComponent {
  state = { open: false }
  handleClick = () => {
    this.setState({ open: !this.state.open });
  }
  render() {
    const { classes, owner, repository } = this.props
    if (this.props.data.loading) {
      return(<div>{ console.log("loading") }</div>)
    }
    if (this.props.data.error) {
      return(<div>{ console.log(this.props.data.error) }</div>)
    }
    return (
      <div>
        <ListItem button onClick={this.handleClick}>
          <ListItemText inset primary={owner + '/' + repository} />
          <Badge className={classes.badge} badgeContent={this.props.data.repository.issues.edges.length} color="primary">
            <ArchiveIcon />
          </Badge>
        </ListItem>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          {this.props.data.repository.issues.edges.slice().reverse().map(issue =>
            <Link to={`/issues/${issue.node.id}`} >
              <ListItem button className={classes.nested}>
                <ListItemText inset primary={issue.node.title}
                  secondary={`#${issue.node.number} ${displayTime(issue.node.createdAt)}`}
                />
              </ListItem>
            </Link>
          )}
        </Collapse>
      </div>
    )
  }
}

const IssueQuery = gql`
  query IssueQuery($owner: String!, $repository: String!, $labels: [String!]){
    repository(owner: $owner, name: $repository) {
      issues(last: 10, states: OPEN, labels: $labels) {
        edges {
          node {
            id
            title
            number
            createdAt
          }
        }
      }
    }
  }
`

const IssueListWithQuery = graphql(IssueQuery, {
  options: ownProps => ({
    variables: { owner: ownProps.owner, repository: ownProps.repository, labels: ownProps.labels }
  }),
})(withStyles(styles)(IssueList))
export default IssueListWithQuery
