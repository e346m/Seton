import React from 'react'
import IssueList from './IssueList.jsx'

export default class Issues extends React.PureComponent {
  handleRepo = (name, label) => {
    const val = name.split('/')
    return val.concat(label)
  }
  render() {
    const _repo = this.props.location.state.repos.map(repo =>
      this.handleRepo(repo.name, repo.label)
    )
    return (
      <div>
        { _repo.map(r =>
          <IssueList owner={r[0]} repository={r[1]} labels={r[2]} />
        )}
      </div>
    )
  }
}
