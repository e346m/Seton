import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from 'material-ui/styles'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class IssueList extends React.PureComponent {
  state = { open: true }
  handleClick = () => {
    this.setState({ open: !this.state.open });
  }
  render() {
    const { classes } = this.props
    if (this.props.loading) {
      return(<div>loading</div>)
    }
    if (this.props.error) {
      return(<div>error</div>)
    }
    return (
      <List className={classes.root} subheader={<ListSubheader>Nested List Items</ListSubheader>}>
        <ListItem button onClick={this.handleClick}>
          <ListItemText inset primary="Inbox" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          <ListItem button className={classes.nested}>
            <ListItemText inset primary="Starred" />
            {console.log(this.props)}
          </ListItem>
        </Collapse>
      </List>
    )
  }
}

const IssueQuery = gql`
  query IssueQuery($owner: String!, $repository: String!){
    repository(owner: $owner, name: $repository) {
      url
      name
      viewerSubscription
      issues(first: 10, states: OPEN) {
        edges {
          node {
            title
            number
            bodyText
          }
        }
      }
    }
  }
`

const IssueListWithQuery = graphql(IssueQuery, {
  options: ownProps => ({
    variables: { owner: ownProps.owner, repository: ownProps.repository }
  }),
})(withStyles(styles)(IssueList))
export default IssueListWithQuery
