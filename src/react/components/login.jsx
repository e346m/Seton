import React from 'react'
import Token from './Token.jsx'

export default class Login extends React.PureComponent {
  isLogin = () => {
    if (localStorage.getItem('token')) {
      this.props.history.replace('/')
    }
  }
  componentWillMount() {
    this.isLogin()
  }
  render() {
    return(
      <Token />
    )
  }
}
