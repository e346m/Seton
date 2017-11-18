import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: 900,
    margin: 15,
  },
  cardHeader: {
    paddingBottom: 0,
  },
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
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar alt={node.author.login}
                src={node.author.avatarUrl} className={classes.bigAvatar}
              /> }
            title={node.title}
            subheader={`commented by ${node.author.login}`}
            className={classes.cardHeader}
          />
          <CardContent>
            <Typography component='p' dangerouslySetInnerHTML={ {__html: node.bodyHTML} } />
          </CardContent>
        </Card>
        { node.comments.edges.map(comment =>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar alt={comment.node.author.login} src={comment.node.author.avatarUrl} className={classes.avatar} />
              }
              subheader={`commented by ${comment.node.author.login}`}
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography component='p' dangerouslySetInnerHTML={ {__html: comment.node.bodyHTML} } />
            </CardContent>
          </Card>
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
