import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// ログアウト確認用コード

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.LoginReducer.email,
      password: this.props.LoginReducer.password,
    };
  }

  render() {
    return (
      <div>
        <h2>管理者画面</h2>
        <hr/>
        <h2><Link to={{ pathname: '/logout', state: { email: this.state.email, password: this.state.password} }}>ログアウト</Link></h2>
        <p>{this.state.email}</p>
      </div>
    );
  }
}

export default UserManagement