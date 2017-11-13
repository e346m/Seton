import React from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

// TODO create IsuueList and Issue
class Issues extends React.PureComponent {
  render() {
    const [owner, repository] = this.props.location.state.group.name.split('/')
    this.props.client.query({
      query: IssueQuery,
      variables: {owner, repository},
    }).then((data) => {
      console.log(this.props)
      return(
        <div>
          Issue page
          {data.data.repository.issues.edges.map(issue =>
            <p>title: {issue.node.title}, body: {issue.node.bodyText}</p>,
          )}
        </div>
      )
    }).catch((err) => {
      console.log(err)
      return(<div>Something Wrong</div>)
    })
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
export default withApollo(Issues)
