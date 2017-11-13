import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Issues extends React.PureComponent {
  render() {
    if (this.props.data.loading) {
      return(<div>loading</div>)
    }
    if (this.props.data.error) {
      return(<div>Something Wrong</div>)
    }
    return (
      <div>
        <div>
          Issue page
          {console.log(this.props.data.repository)}
          {this.props.data.repository.issues.edges.map(issue =>
            <p>title: {issue.node.title}, body: {issue.node.bodyText}</p>,
          )}
        </div>
      </div>
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
const IssueWithQuery = graphql(IssueQuery, {
  options: ownProps => ({
    variables: { owner: ownProps.owner, repository: ownProps.repository }
  }),
})(Issues)
export default IssueWithQuery
