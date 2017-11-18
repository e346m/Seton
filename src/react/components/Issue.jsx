import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar';

const styles = {
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

class Issue extends React.Component {
  render() {
    const { classes } = this.props
    const { loading, errors, node } = this.props.data
    console.log(this.props.data)
    if (loading) {
      return(<div>{console.log("loading")}</div>)
    }
    return (
      <div>
        <Avatar alt={node.author.login} src={node.author.avatarUrl} className={classes.bigAvatar} />
        <div>{node.title}</div>
        <div dangerouslySetInnerHTML={ {__html: node.bodyHTML} } />
        { node.comments.edges.map(comment =>
          <div>
            <Avatar alt={comment.node.author.login} src={comment.node.author.avatarUrl} className={classes.avatar} />
            <div dangerouslySetInnerHTML={ {__html: comment.node.bodyHTML} } />
          </div>
        )}
      </div>
    )
  }
}

const IssueQuery = gql`
  query IssueQuery($id: ID!) {
    node(id: $id) {
      ... on Issue {
        title
        author {
          login
          avatarUrl(size: 128)
        }
        bodyHTML
        comments(first: 10) {
          edges {
            node {
              author {
                login
                avatarUrl(size: 44)
              }
              bodyHTML
            }
          }
        }
      }
    }
  }
`

const IssueWithQuery = graphql(IssueQuery, {
  options: ownProps => ({
    variables: { id: ownProps.match.params.id }
  }),
})(withStyles(styles)(Issue))

export default IssueWithQuery
