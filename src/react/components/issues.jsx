import React from 'react'
import IssueList from './IssueList.jsx'

export default class Issues extends React.PureComponent {
  render() {
    const [owner, repository] = this.props.location.state.group.name.split('/')
    return (
      <div>
        <IssueList owner={owner} repository={repository} />
      </div>
    )
  }
}
