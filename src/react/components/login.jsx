import React from 'react'

export default class Login extends React.PureComponent {
  state = {
    token: '',
  }
  handleSave = () => {
    localStorage.setItem('token', this.state.token)
    this.props.history.replace('/')
  }
  isLogin = () => {
    if (localStorage.getItem('token')) {
      this.props.history.replace('/')
    }
  }
  componentWillMount() {
    this.isLogin()
  }
  render() {
    return (
      <div>
        <div>
        Set your Github API Token along with 'URL'
        </div>
        <div>
          <input
            value = {this.state.token}
            placeholder="Token"
            onChange={e => this.setState({ token: e.target.value })}
          />
          <button onClick={this.handleSave}>Submit</button>
        </div>
      </div>
    )
  }
}
