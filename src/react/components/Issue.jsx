import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from 'material-ui/styles'

class Issue extends React.Component {
  render() {
    const { loading, errors, node } = this.props.data
    if (loading) {
      return(<div>{console.log("loading")}</div>)
    }
    return (
      <div>
        <span dangerouslySetInnerHTML={_html: node.bodyHTML} />
      </div>
    )
  }
}

const IssueQuery = gql`
  query IssueQuery($id: ID!) {
    node(id: $id) {
      ... on Issue {
        title
        author
        bodyHTML
        comments(first: 10) {
          edges {
            node {
              author
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
})(Issue)

export default IssueWithQuery
