import React from 'react'
import { Link } from 'react-router-dom'
import { IssuePath } from './constants.js'
import Button from 'material-ui/Button'


export function returnIssueLink(repos) {
  const _this = (child) => (
    <Link to={{ pathname: IssuePath, state: { repos: repos, link: _this } }}>
      {child}
    </Link>
  )
  return _this
}
